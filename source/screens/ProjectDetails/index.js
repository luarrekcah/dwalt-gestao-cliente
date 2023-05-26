/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Linking,
  Modal,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../global/colorScheme';
import {
  LoadingActivity,
  SimpleButton,
  TextSection,
} from '../../global/Components';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import {
  createItem,
  deleteItem,
  getAllItems,
  getDate,
} from '../../services/Database';
import moment from 'moment/moment';
import storage from '@react-native-firebase/storage';
import {Timeline} from 'react-native-just-timeline';
import {createNotification} from '../../services/Notification';
import {useUser} from '../../hooks/UserContext';
//import MapView from 'react-native-maps'; desinstalar
import styles from './styles';
import GeneralInfos from './components/GeneralInfos';
import GenerationInfos from './components/GenerationInfos';
import OpenImages from './components/OpenImages';
import Documents from './components/Documents';
import DeviceInfos from './components/DeviceInfos';
//import GenerationHistoric from './components/GenerationHistoric';

const ProjectDetails = ({navigation, route}) => {
  const {project} = route.params;
  const [visibleImageViewer, setIsVisibleImageViewer] = React.useState(false);
  const [viewerURI, setViewerURI] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [requestLoading, setRequestLoading] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [typeRequest, setTypeRequest] = React.useState('');
  const [modalRequestVisible, setModalRequestVisible] = React.useState(false);
  const {user, setUser} = useUser();
  const [historicData, setHistoricData] = React.useState([]);

  const loadData = async () => {
    setLoading(true);

    const historicTimeline = await getAllItems({
      path: `gestaoempresa/business/${project.data.business}/projects/${project.key}/historic`,
    });

    const dataTimeline = [];
    historicTimeline.forEach(i => {
      dataTimeline.push(i.data);
    });
    setHistoricData(dataTimeline);

    setLoading(false);
  };

  const sendRequest = async () => {
    if (title === '' || description === '') {
      return Alert.alert(
        'Erro',
        'Sua solicitação precisa ter uma razão, preencha a caixa de texto',
        [{text: 'OK'}],
      );
    }
    setRequestLoading(true);

    const allSurveys = await getAllItems({
      path: `gestaoempresa/business/${project.data.business}/surveys`,
    });

    const check = await allSurveys.filter(
      i => i.data.customer.document === user.data.cpf && !i.data.finished,
    );

    if (typeRequest !== 'complaint') {
      if (check.length !== 0) {
        setModalRequestVisible(false);
        setRequestLoading(false);
        return Alert.alert(
          'Chamado pendente',
          'Existe um chamado pendente registrado no sistema, você não pode solicitar outro chamado até que o anterior seja finalizado pela empresa.',
          [{text: 'OK'}],
        );
      } else {
        createItem({
          path: `gestaoempresa/business/${project.data.business}/surveys`,
          params: {
            type: 'cliente',
            accepted: false,
            finished: false,
            createdAt: getDate(moment),
            project: {
              id: project.key,
              name: project.data.apelidoProjeto,
            },
            customer: {
              name: user.nomeComp ? user.nomeComp : user.nomefantasia,
              document: user.cpf ? user.cpf : user.cnpj,
              id: user.key,
            },
            status: 'Aguardando empresa aceitar o chamado.',
            title: title,
            text: description,
          },
        });
        setModalRequestVisible(false);
        createNotification(
          'Novo chamado!',
          `O(a) cliente ${
            user.data.nomeComp.split(' ')[0] ||
            user.data.nomeFantasia.split(' ')[0]
          } acabou de realizar um chamado. Abra o app para mais informações`,
          project.data.business,
          'staffs',
        );
        ToastAndroid.show('Sua solicitação foi enviada.', ToastAndroid.SHORT);
      }
    } else {
      createItem({
        path: `gestaoempresa/business/${project.data.business}/complaints`,
        params: {
          createdAt: getDate(moment),
          title: title,
          text: description,
          project: {
            id: project.key,
            name: project.data.apelidoProjeto,
          },
          customer: {
            name: user.nomeComp ? user.nomeComp : user.nomefantasia,
            document: user.cpf ? user.cpf : user.cnpj,
            id: user.key,
          },
        },
      });
      setModalRequestVisible(false);
      ToastAndroid.show('Sua reclamação foi enviada.', ToastAndroid.SHORT);
    }
    setRequestLoading(false);
  };

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickImages = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      multiple: true,
    }).then(async images => {
      ToastAndroid.show('Enviando fotos, aguarde...', ToastAndroid.LONG);
      for (let index = 0; index < images.length; index++) {
        const path = `gestaoempresa/business/${
          project.data.business
        }/projects/${project.key}/photos/${new Date().getTime()}-${index}-${
          project.key
        }.jpg`;
        const reference = storage().ref(path);
        const dataUrl = `data:image/png;base64,${images[index].data}`;
        await reference.putString(dataUrl, 'data_url');
        const url = await reference.getDownloadURL();

        createItem({
          path: `gestaoempresa/business/${project.data.business}/projects/${project.key}/photos`,
          params: {url, path},
        });
      }

      loadData();
    });
  };

  const deleteImage = item => {
    console.log(item);
    storage().ref(item.data.path).delete();
    deleteItem({
      path: `gestaoempresa/business/${project.data.business}/projects/${project.key}/photos/${item.key}`,
    });
    loadData();
  };

  if (loading) {
    return <LoadingActivity />;
  } else {
    return (
      <ScrollView style={styles.white}>
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
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                {project.data.apelidoProjeto}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                {project.data.kwp}
                kWp
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  paddingHorizontal: 10,
                  marginRight: 20,
                  paddingVertical: 5,
                  borderRadius: 100,
                }}>
                <Text
                  style={{
                    color: Colors.whitetheme.primary,
                    fontWeight: 'bold',
                    fontSize: 10,
                  }}>
                  {project.data.category.toUpperCase()}
                </Text>
              </View>
              {project.data.overview ? (
                <>
                  <Text
                    style={{
                      color: `${
                        project.data.overview.status === 'Online'
                          ? '#07f045'
                          : '#bbbdbb'
                      }`,
                      fontWeight: 'bold',
                    }}>
                    {project.data.overview.status}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                      Geração hoje
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                      <Icon name="battery-charging" size={20} color="#fff" />
                      {project.data.overview.generationHistoric.today}
                      kW
                    </Text>
                  </View>
                </>
              ) : (
                ''
              )}
            </View>
          </View>
        </ImageBackground>
        <View style={styles.container}>
          {/* INFORMAÇÕES GERAIS */}
          <TextSection value={'Informações Gerais'} />
          <GeneralInfos project={project} />
          {/* INFORMAÇÕES GERAÇÃO */}

          {project.data.overview ? (
            <>
              <TextSection value={'Informações de Geração'} />
              <GenerationInfos project={project} />
            </>
          ) : (
            ''
          )}
          {/* FOTOS LIVRES */}
          <TextSection value={'Fotos'} />
          <OpenImages
            project={project}
            deleteImage={deleteImage}
            setViewerURI={setViewerURI}
            setIsVisibleImageViewer={setIsVisibleImageViewer}
            pickImages={pickImages}
          />
          {/* DOCUMENTOS */}
          <TextSection value={'Documentos'} />
          <Documents project={project} />
          {/* GRÁFICO INFORMATIVO (COLETAR D API)
          <GenerationHistoric project={project} />
          */}

          {/* APARELHOS DO SISTEMA */}
          {project.data.overview && project.data.overview.devices ? (
            <>
              <TextSection value={'Aparelhos do Sistema'} />
              <DeviceInfos project={project} />
            </>
          ) : (
            ''
          )}

          {/* HISTÓRICO DE PROJETO */}
          {historicData.length !== 0 ? (
            <>
              <TextSection value={'Histórico do projeto'} />
              <View>
                <Timeline data={historicData} />
              </View>
            </>
          ) : (
            ''
          )}
          <TextSection value={'Localização'} />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                'https://www.google.com.br/maps/search/' + project.data.coords,
              );
            }}>
            <ImageBackground
              style={styles.mapBackground}
              source={require('../../../assets/projectdetails/banner.jpg')}>
              <Text>Clique para abrir o Maps</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TextSection value={'Suporte & Reclamação'} />
          <SimpleButton
            icon={'alert'}
            value="Solicitar Vistoria"
            type={'warning'}
            onPress={() => {
              setModalRequestVisible(true);
              setTypeRequest('survey');
            }}
          />
          <SimpleButton
            icon={'alert'}
            value="Fazer Reclamação"
            type={'danger'}
            onPress={() => {
              setModalRequestVisible(true);
              setTypeRequest('complaint');
            }}
          />
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalRequestVisible}
            onRequestClose={() => {
              setModalRequestVisible(!modalRequestVisible);
              setRequestLoading(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {requestLoading ? (
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    Carregando...
                  </Text>
                ) : (
                  <View>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      Olá, qual a razão da{' '}
                      {typeRequest === 'complaint' ? 'reclamação' : 'vistoria'}?
                    </Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Título"
                      placeholderTextColor={Colors.whitetheme.primary}
                      autoCapitalize="none"
                      onChangeText={text => setTitle(text)}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Estou com um problema em..."
                      placeholderTextColor={Colors.whitetheme.primary}
                      autoCapitalize="none"
                      multiline={true}
                      onChangeText={text => setDescription(text)}
                      numberOfLines={10}
                    />
                    <SimpleButton
                      value="Enviar"
                      type={'primary'}
                      onPress={() => sendRequest()}
                    />
                    <SimpleButton
                      value="Cancelar"
                      type={'warning'}
                      onPress={() => setModalRequestVisible(false)}
                    />
                  </View>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    );
  }
};

export default ProjectDetails;
