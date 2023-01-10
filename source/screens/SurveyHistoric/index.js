import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../global/colorScheme';
import {LoadingActivity, TextSection} from '../../global/Components';
import {getSurveyData, getUserData} from '../../services/Database';

import moment from '../../vendors/moment';

const SurveyHistoric = ({navigation}) => {
  const [user, setUser] = React.useState();
  const [surveys, setSurveys] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const loadData = async () => {
    setLoading(true);
    setUser(await getUserData());
    setSurveys(await getSurveyData());
    setLoading(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <LoadingActivity />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TextSection value={'Chamados'} />
          {surveys.map(item => {
            if (item.data.finished) {
              return (
                <View style={styles.card} key={item.key}>
                  <View style={styles.row}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                      {item.data.title}
                    </Text>
                    <View style={styles.status}>
                      <Text style={{color: Colors.whitetheme.primary}}>
                        {item.data.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={{marginVertical: 20}}>{item.data.text}</Text>
                  <View style={[styles.row, {marginVertical: 20}]}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        console.log("aa");
                        navigation.navigate('Review');
                      }}>
                      <Text style={{color: Colors.whitetheme.primary}}>
                        <Icon
                          name={'star'}
                          size={20}
                          color={Colors.whitetheme.primary}
                        />
                      </Text>
                      <Text style={{color: Colors.whitetheme.primary}}>
                        Avaliar
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      color: '#fff',
                    }}>
                    <Icon name={'clock'} size={20} color={'#fff'} />{' '}
                    {moment(item.data.createdAt).fromNow()}
                  </Text>
                </View>
              );
            }
          })}
          {surveys.filter(i => i.data.finished).length === 0 ? (
            <View style={{alignContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#000000'}}>
                Não há chamados finalizados para mostrar no histórico.
              </Text>
            </View>
          ) : (
            ''
          )}
        </ScrollView>
      </View>
    );
  }
};

const styles = new StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: Colors.whitetheme.primary,
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  status: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
  button: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SurveyHistoric;
