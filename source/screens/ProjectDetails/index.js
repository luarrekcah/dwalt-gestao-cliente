import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../global/colorScheme';
import {TextSection} from '../../global/Components';

const ProjectDetails = ({navigation, route}) => {
  const {project} = route.params;
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../../assets/home/bannerbackground.jpg')}>
        <View style={styles.projectCard}>
          <Text style={styles.projectTitle}>{project.apelidoProjeto}</Text>
          <Text style={styles.projectCategory}>Usina</Text>
          <View style={styles.bottomProject}>
            <Text style={styles.bottomKwp}>
              <Icon name="flash-on" size={20} color="#fff" />
              {project.kwp}
              kWp
            </Text>
            <Text style={styles.bottomStatus}>Status: {project.Status}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.container}>
        <TextSection value={'Fotos'} />
        <ScrollView horizontal>
          <ImageBackground
            style={styles.backgroundImagePhoto}
            source={require('../../../assets/home/bannerbackground.jpg')}
          />
          <ImageBackground
            style={styles.backgroundImagePhoto}
            source={require('../../../assets/home/bannerbackground.jpg')}
          />
          <ImageBackground
            style={styles.backgroundImagePhoto}
            source={require('../../../assets/home/bannerbackground.jpg')}
          />
        </ScrollView>
        <TextSection value={'Dados Solicitados'} />
        <TextSection value={'Localização'} />
      </View>
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  container: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    top: -40,
  },
  backgroundImage: {
    height: 250,
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
  backgroundImagePhoto: {
    width: 80,
    height: 140,
    marginHorizontal: 5,
  },
});

export default ProjectDetails;
