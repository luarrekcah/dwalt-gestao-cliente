import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../global/colorScheme';
import {LoadingActivity} from '../../global/Components';
import {getUserData, updateItem} from '../../services/Database';
import {Rating} from 'react-native-ratings';

import moment from '../../vendors/moment';

const Review = ({navigation, route}) => {
  const {key} = route.params;
  console.log(key);

  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const [velocidade, setVelocidade] = React.useState(3);
  const [atendimento, setAtendimento] = React.useState(3);
  const [resolucao, setResolucao] = React.useState(3);
  const [sugestao, setSugestao] = React.useState('');

  const loadData = async () => {
    setLoading(true);
    setUser(await getUserData());
    setLoading(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const ratingCards = [
    {
      title: 'Atendimento',
      onFinishRating: rating => {
        setAtendimento(rating);
      },
    },
    {
      title: 'Velocidade',
      onFinishRating: rating => {
        setVelocidade(rating);
      },
    },
    {
      title: 'Resolução do Problema',
      onFinishRating: rating => {
        setResolucao(rating);
      },
    },
  ];

  const sendRating = () => {
    updateItem({
      path: `/gestaoempresa/business/${user.data.business}/surveys/${key}/rating`,
      params: {
        velocidade,
        atendimento,
        resolucao,
        sugestao,
        reviewedAt: moment().format(),
      },
    });
    navigation.goBack();
  };

  if (loading) {
    return <LoadingActivity />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          {ratingCards.map((item, index) => {
            return (
              <View key={index + 1} style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Rating
                  showRating
                  onFinishRating={item.onFinishRating}
                  style={styles.ratingCard}
                />
              </View>
            );
          })}
          <TextInput
            style={styles.textInput}
            placeholderTextColor={'#9d9d9e'}
            value={sugestao}
            multiline={true}
            placeholder={'Sugestão de melhoria'}
            onChangeText={text => {
              setSugestao(text);
            }}
          />
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: Colors.whitetheme.primary},
            ]}
            onPress={() => {
              sendRating();
            }}>
            <Text style={{color: '#fff'}}>Enviar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
};

const styles = new StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    borderColor: '#9d9d9e',
    borderWidth: 2,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
  },
  cardTitle: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingCard: {
    paddingVertical: 10,
  },
  textInput: {
    margin: 10,
    width: Dimensions.get('window').width - 40,
    borderColor: '#000000',
    placeholderTextColor: '#000000',
    color: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 25,
  },

  button: {
    backgroundColor: Colors.whitetheme.primary,
    borderRadius: 30,
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
});

export default Review;
