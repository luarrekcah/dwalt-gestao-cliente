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
          <MiniCard textValue="2 Projetos" iconName="folder" iconSize={40} />
          <MiniCard textValue="64 kWp" iconName="flash-on" iconSize={40} />
          <MiniCard textValue="0 Concluídos" iconName="check" iconSize={40} />
        </ScrollView>
        <TextSection value={'Projetos'} />
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
});

export default Home;
