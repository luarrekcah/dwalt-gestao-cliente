/* eslint-disable react-native/no-inline-styles */
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
  ActivityIndicator,
} from 'react-native';
import moment from '../../../vendors/moment';
import Colors from '../../../global/colorScheme';
import {
  LoadingActivity,
  MiniCard,
  TextSection,
} from '../../../global/Components';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getBusinessData,
  getGrowattData,
  getItems,
  getProjectsData,
  getSurveyData,
  getUserData,
} from '../../../services/Database';
import {status} from '../../../utils/dictionary';
import {LineChart} from 'react-native-chart-kit';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import QRCode from 'react-native-qrcode-svg';

const Home = ({navigation}) => {
  const [user, setUser] = React.useState();
  const [projects, setProjects] = React.useState([]);
  const [business, setBusiness] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [activeSurvey, setActiveSurvey] = React.useState([]);
  const [irradiation, setIrradiation] = React.useState([]);
  const [growatt, setGrowatt] = React.useState();

  const loadData = async () => {
    setLoading(true);
    setGrowatt(await getGrowattData());
    setUser(await getUserData());
    const surveys = await getSurveyData();
    const businesss = await getBusinessData();
    const actSurvey = surveys.filter(i => !i.data.finished);
    setBusiness(businesss);
    setProjects(await getProjectsData());
    setActiveSurvey(actSurvey);
    Geolocation.getCurrentPosition(info => {
      axios
        .get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
            hourly: 'temperature_2m,direct_radiation,weathercode',
            daily:
              'sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant',
            timezone: 'auto',
            current_weather: true,
            start_date: moment().format('YYYY-MM-DD'),
            end_date: moment().format('YYYY-MM-DD'),
          },
        })
        .then(r => {
          setIrradiation(r.data);
        });
    });

    setLoading(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await loadData();
    });
    return unsubscribe;
  }, [navigation, user]);

  const getKwp = () => {
    let kwpTotal = 0;
    projects.forEach(item => {
      kwpTotal += Number(item.data.kwp.replaceAll(',', '.'));
    });
    return kwpTotal;
  };

  const getGrowattProject = plantName => {
    if (growatt) {
      const finded = growatt.plantList.data.data.plants.find(
        g => g.name === plantName,
      );
      return finded;
    } else {
      return [];
    }
  };

  const weatherDict = {
    0: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-forecast-sun-nature-light-lightning-shine-15478.png',
      title: 'Céu limpo',
    },
    1: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-forecast-cloud-clouds-cloudy-sun-partly-sunny-15476.png',
      title: 'Predominantemente limpo',
    },
    2: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-thunder-forecast-cloud-clouds-sunny-sun-15473.png',
      title: 'Parcialmente nublado',
    },
    3: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-thunder-forecast-cloud-clouds-sunny-sun-15473.png',
      title: 'Nublado',
    },
    45: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-sun-mountain-cloud-hill-wind-windy-15454.png',
      title: 'Neblina',
    },
    48: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-thunder-forecast-snow-cloud-nature-wind-15460.png',
      title: 'Nevoeiro',
    },
    56: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-sun-mountain-cloud-hill-wind-windy-15454.png',
      title: 'Garoa congelante leve',
    },
    57: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-sun-mountain-cloud-hill-wind-windy-15454.png',
      title: 'Garoa congelante densa',
    },
    61: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-wind-forecast-cloud-clouds-cloudy-rain-15481.png',
      title: 'Chuva ligeira',
    },
    63: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-rain-forecast-cloud-clouds-cloudy-dark-15474.png',
      title: 'Chuva moderada',
    },
    65: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-thunder-forecast-cloud-rain-cloudy-lightning-15456.png',
      title: 'Chuva forte',
    },
    66: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-thunder-forecast-snow-wind-cloudy-lightning-15451.png',
      title: 'Chuva congelante leve',
    },
    67: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-thunder-forecast-snow-wind-cloudy-lightning-15451.png',
      title: 'Chuva congelante pesada',
    },
    71: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-forecst-temperature-measure-snow-snowfall-flake-15483.png',
      title: 'Queda de neve leve',
    },
    73: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-forecst-temperature-measure-snow-snowfall-flake-15483.png',
      title: 'Queda de neve moderada',
    },
    75: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-forecst-temperature-measure-snow-snowfall-flake-15483.png',
      title: 'Queda de neve pesada',
    },
    77: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-rain-drib-drop-sky-waterdrop-heavy-15492.png',
      title: 'Grãos de neve',
    },
    80: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-wind-forecast-cloud-clouds-cloudy-rain-15481.png',
      title: 'Chuva leve',
    },
    81: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-rain-forecast-cloud-clouds-cloudy-dark-15474.png',
      title: 'Chuva moderada',
    },
    82: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-thunder-forecast-lightningwind-cloudy-lightning-15487.png',
      title: 'Chuva violenta',
    },
    95: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-thunder-forecast-lightningwind-cloudy-lightning-15487.png',
      title: 'Trovoada ligeira ou moderada',
    },
    96: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-thunder-forecast-snow-wind-cloudy-lightning-15451.png',
      title: 'Trovoada com granizo leve',
    },
    99: {
      iconURL:
        'https://cdn.iconscout.com/icon/free/png-128/weather-thunder-forecast-snow-wind-cloudy-lightning-15451.png',
      title: 'Trovoada com granizo pesado',
    },
  };

  const statusDict = {
    0: {
      title: 'Desconectado',
      color: '#a19f9f',
    },
    1: {
      title: 'Normal',
      color: '#13fc03',
    },
    2: {
      title: 'Aguardando',
      color: '#13fc03',
    },
    3: {
      title: 'Falha',
      color: '#fa3916',
    },
    4: {
      title: 'Offline',
      color: '#a19f9f',
    },
  };

  if (loading) {
    return <LoadingActivity />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerDetail}>
            <Text style={styles.welcome}>
              Bem vindo(a)
              {user === undefined
                ? ''
                : ' ' +
                  (user.data.cpf
                    ? user.data.nomeComp.split(' ')[0]
                    : user.data.nomeFantasia.split(' ')[0])}
              !
            </Text>
            <Text style={styles.linkedOn}>
              Vinculado a {business.data.info.documents.nome_fantasia}
            </Text>
          </View>
          <View style={styles.backgroundDetail}>
            <View>
              {irradiation.hourly ? (
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                  }}>
                  <View>
                    <Image
                      style={{width: 50, height: 50}}
                      source={{
                        uri: weatherDict[
                          irradiation.current_weather.weathercode
                        ].iconURL,
                      }}
                    />
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 25,
                        fontWeight: '900',
                      }}>
                      {irradiation.current_weather.temperature}
                      °C
                    </Text>
                    <Text
                      style={{
                        color: '#6e6f70',
                        fontWeight: '600',
                        marginBottom: 10,
                      }}>
                      {
                        weatherDict[irradiation.current_weather.weathercode]
                          .title
                      }
                    </Text>
                    <Text style={{color: '#000000'}}>
                      Direção do vento:{' '}
                      {irradiation.current_weather.winddirection}°
                    </Text>
                    <Text style={{color: '#000000'}}>
                      Velocidade do vento:{' '}
                      {irradiation.current_weather.windspeed}
                      km/h
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
                        {moment(irradiation.daily.sunrise[0]).format('HH:MM')}
                      </Text>
                      <Text style={{color: '#000000', fontWeight: '900'}}>
                        -----------
                      </Text>
                      <Text style={{color: '#000000', fontWeight: '900'}}>
                        {moment(irradiation.daily.sunset[0]).format('HH:MM')}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <ActivityIndicator size="small" color="#0000ff" />
                </View>
              )}

              <View style={{marginTop: 20}}>
                {irradiation.hourly ? (
                  <>
                    <Text
                      style={{
                        color: '#5d5e5e',
                        fontWeight: '900',
                        fontSize: 20,
                      }}>
                      Irradiação solar hoje{' '}
                      <Text style={{fontSize: 10}}>
                        {moment().format('DD/MM')}
                      </Text>
                    </Text>
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
                        decimalPlaces: 0,
                        color: (opacity = 1) =>
                          `rgba(255, 255, 255, ${opacity})`,
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
                  </>
                ) : (
                  <ActivityIndicator size="small" color="#0000ff" />
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
                content={[parseInt(getKwp() * 30 * 4.5, 10), 'kWh/mês']}
                iconName="flash"
                iconSize={40}
              />
              <MiniCard
                content={['95%', 'ECONOMIA']}
                iconName="cash"
                iconSize={40}
              />
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <View style={{alignItems: 'center', padding: 10}}>
                <Text>
                  <IconCommunity
                    name="molecule-co2"
                    size={40}
                    color={Colors.whitetheme.primary}
                  />
                </Text>
                <Text
                  style={{color: '#000000', fontSize: 15, fontWeight: 'bold'}}>
                  {Math.trunc(getKwp() * 30 * 4.5 * 0.85)} kg/ano
                </Text>
                <Text style={{color: '#000000'}}>CO² Reduzido</Text>
              </View>
              <View style={{alignItems: 'center', padding: 10}}>
                <Text>
                  <Icon
                    name="outdoor-grill"
                    size={40}
                    color={Colors.whitetheme.primary}
                  />
                </Text>
                <Text
                  style={{color: '#000000', fontSize: 15, fontWeight: 'bold'}}>
                  {Math.trunc(getKwp() * 30 * 4.5 * 0.85 * 0.8)} kg/ano
                </Text>
                <Text style={{color: '#000000'}}>Carvão economizado</Text>
              </View>
              <View style={{alignItems: 'center', padding: 10}}>
                <Text>
                  <IconCommunity
                    name="forest"
                    size={40}
                    color={Colors.whitetheme.primary}
                  />
                </Text>
                <Text
                  style={{color: '#000000', fontSize: 15, fontWeight: 'bold'}}>
                  {Math.trunc((getKwp() * 30 * 4.5 * 0.85) / 12.48)}
                </Text>
                <Text style={{color: '#000000'}}>Árvores salvas</Text>
              </View>
            </View>
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
                    path: `/gestaoempresa/business/${user.data.business}/projects/${activeSurvey[0].data.projectId}`,
                  });
                  const item = {
                    key: activeSurvey[0].data.projectId,
                    data: project,
                  };
                  if (item.data) {
                    navigation.navigate('ProjectDetails', {
                      project: item,
                    });
                  } else {
                    ToastAndroid.show(
                      'Ocorreu um erro ao abrir as informações, vá até o projeto manualmente.',
                      ToastAndroid.SHORT,
                    );
                  }
                }}>
                <ImageBackground
                  imageStyle={styles.imageCard}
                  source={require('../../../../assets/home/survey.jpg')}>
                  <View style={styles.projectCard}>
                    <View
                      style={{
                        alignSelf: 'center',
                        padding: 10,
                        borderRadius: 10,
                        margin: 10,
                        backgroundColor: '#fff',
                      }}>
                      <QRCode
                        logo={require('../../../../assets/icon.png')}
                        value={JSON.stringify({
                          type: 'endSurvey',
                          key: activeSurvey[0].key,
                        })}
                      />
                    </View>
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
                              {item.data.category.toUpperCase()}
                            </Text>
                          </View>
                          {item.data.username_growatt &&
                          item.data.overview &&
                          growatt &&
                          getGrowattProject(item.data.username_growatt) ? (
                            <>
                              <Text
                                style={{
                                  color: `${
                                    statusDict[
                                      getGrowattProject(
                                        item.data.username_growatt,
                                      ).status
                                    ].color
                                  }`,
                                  fontWeight: 'bold',
                                }}>
                                {
                                  statusDict[
                                    getGrowattProject(
                                      item.data.username_growatt,
                                    ).status
                                  ].title
                                }
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
                                  <Icon
                                    name="battery-charging-full"
                                    size={20}
                                    color="#fff"
                                  />
                                  {item.data.overview.data.data.today_energy}
                                  kW
                                </Text>
                              </View>
                            </>
                          ) : (
                            ''
                          )}
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
