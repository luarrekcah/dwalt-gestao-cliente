import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../global/colorScheme';
import {TextSection} from '../../global/Components';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
//import MapView from 'react-native-maps'; desinstalar

const ProjectDetails = ({navigation, route}) => {
  const {project} = route.params;
  const [media, setmedia] = React.useState([]);
  const [allMedia, setAllmedia] = React.useState([]);
  const [visibleImageViewer, setIsVisibleImageViewer] = React.useState(false);
  const [viewerURI, setViewerURI] = React.useState([]);

  const pickImages = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      multiple: true,
    }).then(images => {
      let base64Imgs = [];
      images.forEach((item, i) => {
        base64Imgs.push('data:image/png;base64,' + item.data);
      });
      setmedia(base64Imgs);
    });
  };

  const RenderCollectedItems = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text style={styles.collectedCard}>
          Nome Completo
          <Icon
            name={project.nomeComp !== '' ? 'check' : 'x'}
            size={15}
            color={'#fff'}
          />
        </Text>
        <Text style={styles.collectedCard}>
          CPF
          <Icon
            name={project.cpf !== '' ? 'check' : 'x'}
            size={15}
            color={'#fff'}
          />
        </Text>
        <Text style={styles.collectedCard}>
          Nome da Mãe
          <Icon
            name={project.nomeMae !== '' ? 'check' : 'x'}
            size={15}
            color={'#fff'}
          />
        </Text>
        <Text style={styles.collectedCard}>
          Endereço Completo
          <Icon
            name={project.endComp !== '' ? 'check' : 'x'}
            size={15}
            color={'#fff'}
          />
        </Text>
        <Text style={styles.collectedCard}>
          Data de Nascimento
          <Icon
            name={project.dataNasc !== '' ? 'check' : 'x'}
            size={15}
            color={'#fff'}
          />
        </Text>
        <Text style={styles.collectedCard}>
          E-mail
          <Icon
            name={project.email !== '' ? 'check' : 'x'}
            size={15}
            color={'#fff'}
          />
        </Text>
        <Text style={styles.collectedCard}>
          Entre outros dados básicos para homologação
        </Text>
      </ScrollView>
    );
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <ImageView
        images={[
          {
            uri: viewerURI,
          },
        ]}
        imageIndex={0}
        visible={visibleImageViewer}
        onRequestClose={() => setIsVisibleImageViewer(false)}
      />
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
          {media.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setViewerURI(item);
                  setIsVisibleImageViewer(true);
                }}>
                <ImageBackground
                  style={styles.backgroundImagePhoto}
                  source={{uri: item}}
                />
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.iconAdd} onPress={pickImages}>
            <Icon name="add" size={40} color="#fff" />
          </TouchableOpacity>
        </ScrollView>
        <TextSection value={'Dados Salvos'} />
        <RenderCollectedItems />
        <TextSection value={'Localização'} />
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              'https://www.google.com.br/maps/search/' + project.coords,
            );
          }}>
          <ImageBackground
            style={{height: 250, alignItems: 'center', paddingTop: 40}}
            source={require('../../../assets/projectdetails/banner.jpg')}>
            <Text>Clique para abrir o Maps</Text>
          </ImageBackground>
        </TouchableOpacity>
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
  collectedCard: {
    color: '#fff',
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.whitetheme.primary,
    borderRadius: 80,
  },
  iconAdd: {
    backgroundColor: Colors.whitetheme.primary,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 140,
  },
});

export default ProjectDetails;
