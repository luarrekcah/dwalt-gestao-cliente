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

import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = ({navigation}) => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      const userdata = JSON.parse(data);
      setUser(userdata);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.welcome}>
          Bem vindo{user === undefined ? '' : ' ' + user.nome}!
        </Text>
        <Text style={styles.linkedOn}>Vinculado a D Walt Engenharia.</Text>
        <ScrollView horizontal>
          <View style={styles.miniCard}>
            <Icon name="folder" size={40} color="#fff" />
            <Text style={styles.textCard}>2 projetos</Text>
          </View>
          <View style={styles.miniCard}>
            <Icon name="flash-on" size={40} color="#fff" />
            <Text style={styles.textCard}>64 kWp</Text>
          </View>
          <View style={styles.miniCard}>
            <Icon name="check" size={40} color="#fff" />
            <Text style={styles.textCard}>0 Conluídos</Text>
          </View>
        </ScrollView>
        <Text style={styles.textSection}>Projetos</Text>
        <TouchableOpacity style={{marginVertical: 10}}>
          <ImageBackground
            imageStyle={{borderRadius: 20}}
            source={require('../../../../assets/home/bannerbackground.jpg')}>
            <View style={styles.projectCard}>
              <Text style={styles.projectTitle}>Projeto Nome</Text>
              <Text style={styles.projectCategory}>Usina</Text>
              <View style={styles.bottomProject}>
                <Text style={styles.bottomKwp}>
                  <Icon name="power" size={20} color="#fff" /> 32,89 kWp
                </Text>
                <Text style={styles.bottomStatus}>Status: Em andamento</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={{marginVertical: 10}}>
          <ImageBackground
            imageStyle={{borderRadius: 20}}
            source={require('../../../../assets/home/bannerbackground.jpg')}>
            <View style={styles.projectCard}>
              <Text style={styles.projectTitle}>Projeto Nome</Text>
              <Text style={styles.projectCategory}>Usina</Text>
              <View style={styles.bottomProject}>
                <Text style={styles.bottomKwp}>
                  <Icon name="power" size={20} color="#fff" /> 32,89 kWp
                </Text>
                <Text style={styles.bottomStatus}>Status: Em andamento</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
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
  miniCard: {
    backgroundColor: Colors.whitetheme.primary,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 10,
    width: 100,
  },
  textCard: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  projectCard: {
    padding: 30,
    borderRadius: 20,
    height: 200,
  },
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
  textSection: {
    color: Colors.whitetheme.gray,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default Home;
