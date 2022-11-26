import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
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

const Home = ({navigation}) => {
  const [user, setUser] = React.useState();
  const [projects, setProjects] = React.useState([]);
  const [business, setBusiness] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [activeSurvey, setActiveSurvey] = React.useState([]);

  const loadData = async () => {
    setLoading(true);
    setUser(await getUserData());
    const surveys = await getSurveyData();
    const businesss = await getBusinessData();
    const actSurvey = surveys.filter(i => !i.data.finished);
    setBusiness(businesss);
    setProjects(await getProjectsData());
    setActiveSurvey(actSurvey);
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
      kwpTotal += Number(item.data.kwp);
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
              Bem vindo{user === undefined ? '' : ' ' + user.data.nome}!
            </Text>
            <Text style={styles.linkedOn}>
              Vinculado a {business.data.info.documents.nome_fantasia}
            </Text>
          </View>
          <View style={styles.backgroundDetail}>
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
                content={[getKwp() * 30 * 4.5, 'kWh/mês']}
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
                        <Text style={styles.projectTitle}>
                          {item.data.apelidoProjeto}
                        </Text>
                        <Text style={styles.projectCategory}>
                          {item.data.category}
                        </Text>
                        <View style={styles.bottomProject}>
                          <Text style={styles.bottomKwp}>
                            <Icon name="flash-on" size={20} color="#fff" />
                            {item.data.kwp}
                            kWp
                          </Text>
                          <Text style={styles.bottomStatus}>
                            Status: {item.data.Status}
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
