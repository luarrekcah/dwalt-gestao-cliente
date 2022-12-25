import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Dimensions,
} from 'react-native';
import moment from '../../../vendors/moment';
import Colors from '../../../global/colorScheme';
import {
  LoadingActivity,
  MiniCard,
  TextSection,
} from '../../../global/Components';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  getBusinessData,
  getItems,
  getProjectsData,
  getSurveyData,
  getUserData,
} from '../../../services/Database';
import {status} from '../../../utils/dictionary';
import {LineChart} from 'react-native-chart-kit';
import axios from 'axios';

const Home = ({navigation}) => {
  const [user, setUser] = React.useState();
  const [projects, setProjects] = React.useState([]);
  const [business, setBusiness] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [activeSurvey, setActiveSurvey] = React.useState([]);
  const [irradiation, setIrradiation] = React.useState([]);

  const loadData = async () => {
    setLoading(true);
    setUser(await getUserData());
    const surveys = await getSurveyData();
    const businesss = await getBusinessData();
    const actSurvey = surveys.filter(i => !i.data.finished);
    setBusiness(businesss);
    setProjects(await getProjectsData());
    setActiveSurvey(actSurvey);

    axios
      .get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: '-9.83',
          longitude: '-66.88',
          hourly: 'temperature_2m,direct_radiation',
          timezone: 'auto',
          start_date: moment().format('YYYY-MM-DD'),
          end_date: moment().format('YYYY-MM-DD'),
        },
      })
      .then(r => setIrradiation(r.data));
    setLoading(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await loadData();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, user]);

  const getKwp = () => {
    let kwpTotal = 0;
    projects.forEach(item => {
      kwpTotal += Number(item.data.kwp.replaceAll(',', '.'));
    });
    return kwpTotal;
  };

  if (loading) {
    return <LoadingActivity />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerDetail}>
            <Text style={styles.welcome}>
              Bem vindo
              {user === undefined ? '' : ' ' + user.data.nomeComp.split(' ')[0]}
              !
            </Text>
            <Text style={styles.linkedOn}>
              Vinculado a {business.data.info.documents.nome_fantasia}
            </Text>
          </View>
          <View style={styles.backgroundDetail}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                paddingTop: 20,
              }}>
              <View>
                <Text style={{color: '#000000'}}>ICON</Text>
                <Text
                  style={{color: '#000000', fontSize: 25, fontWeight: '900'}}>
                  Acrelândia
                </Text>
                <Text
                  style={{
                    color: '#6e6f70',
                    fontWeight: '600',
                    marginBottom: 10,
                  }}>
                  Céu limpo
                </Text>
                <Text style={{color: '#000000'}}>Direção do vento: NORTE</Text>
                <Text style={{color: '#000000'}}>
                  Velocidade do vento: 8km/h
                </Text>
              </View>
              <View>
                <Image
                  style={{width: 170, height: 70, resizeMode: 'stretch'}}
                  source={require('../../../../assets/home/sunset-sunrise.png')}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <Text style={{color: '#000000', fontWeight: '900'}}>
                    06:34
                  </Text>
                  <Text style={{color: '#000000', fontWeight: '900'}}>
                    -----------
                  </Text>
                  <Text style={{color: '#000000', fontWeight: '900'}}>
                    17:23
                  </Text>
                </View>

                <Text style={{color: '#000000', fontWeight: '600'}}>
                  Irradiação solar: 345w/m²
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text
                  style={{color: '#5d5e5e', fontWeight: '900', fontSize: 20}}>
                  Irradiação solar hoje{' '}
                  <Text style={{fontSize: 10}}>{moment().format('DD/MM')}</Text>
                </Text>
                {irradiation.hourly ? (
                  <LineChart
                    data={{
                      labels: [
                        '07:00',
                        '08:00',
                        '09:00',
                        '10:00',
                        '11:00',
                        '12:00',
                        '13:00',
                        '14:00',
                        '15:00',
                        '16:00',
                      ],
                      datasets: [
                        {
                          data: [
                            irradiation.hourly.direct_radiation[6],
                            irradiation.hourly.direct_radiation[7],
                            irradiation.hourly.direct_radiation[8],
                            irradiation.hourly.direct_radiation[9],
                            irradiation.hourly.direct_radiation[10],
                            irradiation.hourly.direct_radiation[11],
                            irradiation.hourly.direct_radiation[12],
                            irradiation.hourly.direct_radiation[13],
                            irradiation.hourly.direct_radiation[14],
                            irradiation.hourly.direct_radiation[15],
                          ],
                        },
                      ],
                    }}
                    width={Dimensions.get('window').width - 20} // from react-native
                    height={240}
                    yAxisLabel=""
                    yAxisSuffix="w/m²"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: Colors.whitetheme.primary,
                      backgroundGradientFrom: Colors.whitetheme.primary,
                      backgroundGradientTo: Colors.whitetheme.primary,
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#fff',
                      },
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                    }}
                  />
                ) : (
                  ''
                )}
              </View>
            </View>

            <TextSection value={'Informações'} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <MiniCard
                content={[`${projects.length}`, 'Projetos']}
                iconName="solar-panel"
                iconSize={40}
              />
              <MiniCard
                content={[getKwp(), 'kWp']}
                iconName="flash"
                iconSize={40}
              />
              <MiniCard
                content={[parseInt(getKwp() * 30 * 4.5), 'kWh/mês']}
                iconName="flash"
                iconSize={40}
              />
              <MiniCard
                content={['95%', 'ECONOMIA']}
                iconName="cash"
                iconSize={40}
              />
            </ScrollView>
            <TextSection value={'Solicitações'} />
            {activeSurvey.length !== 0 ? (
              <TouchableOpacity
                style={styles.marginCard}
                key={activeSurvey[0].key}
                onPress={async () => {
                  ToastAndroid.show(
                    'Abrindo informações do projeto, aguarde.',
                    ToastAndroid.SHORT,
                  );
                  const project = await getItems({
                    path: `/gestaoempresa/business/${user.data.businessKey}/projects/${activeSurvey[0].data.projectId}`,
                  });
                  navigation.navigate('ProjectDetails', {
                    project: {
                      key: activeSurvey[0].data.projectId,
                      data: project,
                    },
                  });
                }}>
                <ImageBackground
                  imageStyle={styles.imageCard}
                  source={require('../../../../assets/home/survey.jpg')}>
                  <View style={styles.projectCard}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      {activeSurvey[0].data.title}
                    </Text>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        fontSize: 14,
                        color: '#fff',
                      }}>
                      {activeSurvey[0].data.text}
                    </Text>
                    <Text
                      style={{
                        marginVertical: 20,
                        alignSelf: 'center',
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      Status: {activeSurvey[0].data.status}
                    </Text>
                    <Text style={{alignSelf: 'center', color: '#fff'}}>
                      Solicitado{' '}
                      {moment(activeSurvey[0].data.createdAt).fromNow()}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <ImageBackground
                imageStyle={styles.imageCard}
                source={require('../../../../assets/home/no-content.jpg')}>
                <View style={styles.emptyCardNB}>
                  <Text
                    style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                    Nenhuma solicitação ativa
                  </Text>
                </View>
              </ImageBackground>
            )}
            <TextSection value={'Projetos'} />
            {projects.length === 0 ? (
              <ImageBackground
                imageStyle={styles.imageCard}
                source={require('../../../../assets/home/no-content.jpg')}>
                <View style={styles.emptyCardNB}>
                  <Text
                    style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                    Nenhum projeto registrado no seu e-mail.
                  </Text>
                </View>
              </ImageBackground>
            ) : (
              projects.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={styles.marginCard}
                    key={index}
                    onPress={() =>
                      navigation.navigate('ProjectDetails', {project: item})
                    }>
                    <ImageBackground
                      imageStyle={styles.imageCard}
                      source={require('../../../../assets/home/bannerbackground.jpg')}>
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
                            {item.data.apelidoProjeto}
                          </Text>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#fff',
                              fontWeight: 'bold',
                            }}>
                            <Icon name="flash-on" size={20} color="#fff" />
                            {item.data.kwp}
                            kWp
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
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
                              {item.data.category.toUpperCase()}
                            </Text>
                          </View>
                          <Text style={{color: '#13fc03', fontWeight: 'bold'}}>
                            On-line
                          </Text>
                          <Text
                            style={{
                              fontSize: 20,
                              color: '#fff',
                              fontWeight: 'bold',
                            }}>
                            <Icon
                              name="battery-charging-full"
                              size={20}
                              color="#fff"
                            />
                            3235kW
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginTop: 20,
                          }}>
                          <Text style={{color: '#fff', fontWeight: '900'}}>
                            {status({value: item.data.Status})}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                          }}>
                          <Text style={{color: '#fff'}}>
                            {item.data.RStatus === '' ||
                            item.data.RStatus === undefined
                              ? 'Sem observação de Status'
                              : item.data.RStatus}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
};

const styles = new StyleSheet.create({
  container: {
    backgroundColor: Colors.whitetheme.primary,
  },
  welcome: {
    color: '#f5f5f5',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
  },
  linkedOn: {
    color: '#d1d1d1',
    fontSize: 20,
    marginBottom: 20,
  },
  headerDetail: {padding: 10},
  backgroundDetail: {
    backgroundColor: Colors.whitetheme.backgroundColor,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 100,
  },
  nullWarn: {color: '#000000', alignSelf: 'center'},
  marginCard: {marginVertical: 10},
  projectCard: {
    padding: 30,
    borderRadius: 20,
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
  emptyCard: {
    padding: 30,
    borderRadius: 20,
    height: 200,
    backgroundColor: Colors.whitetheme.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCardNB: {
    padding: 30,
    borderRadius: 20,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCards: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default Home;
