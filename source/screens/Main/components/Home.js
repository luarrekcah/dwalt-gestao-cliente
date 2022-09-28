import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../../global/colorScheme';
import {MiniCard, TextSection} from '../../../global/Components';
import database from '@react-native-firebase/database';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = ({navigation}) => {
  const [user, setUser] = React.useState();
  const [projects, setProjects] = React.useState([]);

  const loadData = async () => {
    await AsyncStorage.getItem('user').then(data => {
      const userdata = JSON.parse(data);
      setUser(userdata);
    });
  };

  React.useEffect(() => {
    database()
      .ref('/gestaoempresa/projetos')
      .once('value')
      .then(snapshot => {
        let allProjects = [];
        if (snapshot.val() !== null) {
          allProjects = snapshot.val();
        }
        console.log(user);
        const myProjects = allProjects.filter(item => {
          return item.emailApp === user.email;
        });
        setProjects(myProjects);
      });
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const getKwp = () => {
    let kwpTotal = 0;
    projects.forEach(item => {
      kwpTotal += Number(item.kwp);
    });
    console.log(kwpTotal);
    return kwpTotal;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.welcome}>
          Bem vindo{user === undefined ? '' : ' ' + user.nome}!
        </Text>
        <Text style={styles.linkedOn}>Vinculado a D Walt Engenharia.</Text>
        <TextSection value={'Informações'} />
        <ScrollView horizontal>
          <MiniCard
            textValue={projects.length + ' projetos'}
            iconName="folder"
            iconSize={40}
          />
          <MiniCard
            textValue={getKwp() + ' kWp'}
            iconName="flash-on"
            iconSize={40}
          />
          <MiniCard
            textValue={getKwp() * 30 * 4.5 + ' kWh/mês'}
            iconName="flash-on"
            iconSize={40}
          />
          <MiniCard
            textValue="95% Economia"
            iconName="flash-on"
            iconSize={40}
          />
        </ScrollView>
        <TextSection value={'Projetos'} />
        {projects === null || projects.length === 0 ? (
          <View>
            <Text style={styles.nullWarn}>Sem projetos</Text>
          </View>
        ) : (
          <View>
            {projects.map((item, index) => {
              return (
                <TouchableOpacity style={styles.marginCard} key={index}>
                  <ImageBackground
                    imageStyle={styles.imageCard}
                    source={require('../../../../assets/home/bannerbackground.jpg')}>
                    <View style={styles.projectCard}>
                      <Text style={styles.projectTitle}>
                        {item.apelidoProjeto}
                      </Text>
                      <Text style={styles.projectCategory}>Usina</Text>
                      <View style={styles.bottomProject}>
                        <Text style={styles.bottomKwp}>
                          <Icon name="flash-on" size={20} color="#fff" />
                          {item.kwp}
                          kWp
                        </Text>
                        <Text style={styles.bottomStatus}>
                          Status: {item.Status}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  welcome: {
    color: Colors.whitetheme.primary,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  linkedOn: {
    color: Colors.whitetheme.gray,
    fontSize: 20,
    marginBottom: 20,
  },
  nullWarn: {color: '#000000', alignSelf: 'center'},
  marginCard: {marginVertical: 10},
  projectCard: {
    padding: 30,
    borderRadius: 20,
    height: 200,
  },
  imageCard: {borderRadius: 20},
  projectTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  projectCategory: {
    color: Colors.whitetheme.gray,
    fontSize: 20,
  },
  bottomProject: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomKwp: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  bottomStatus: {
    color: Colors.whitetheme.gray,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Home;
