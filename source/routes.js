import React, {useEffect, useState} from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';

import Colors from './global/colorScheme';

import {isInitialized} from './services/Welcome';
import {isLogged} from './services/Auth';

const Stack = createNativeStackNavigator();

import Intro from './screens/Intro';
import Login from './screens/Login';
import Main from './screens/Main';
import ProjectDetails from './screens/ProjectDetails';
import PdfViewer from './screens/PdfViewer';

import {LoadingActivity, NotConnected} from './components/Global';
import MyDocuments from './screens/MyDocuments';

const AppScreens = ({logged, initiated}) => {
  return (
    <Stack.Navigator
      initialRouteName={logged ? (initiated ? 'Main' : 'Login') : 'Intro'}
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: Colors.whitetheme.primary},
          headerTransparent: true,
          headerTitle: 'D | Walt: Connect',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: 'white'},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.dlwalt.com/faq');
              }}>
              <Icon name="help" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: Colors.whitetheme.primary},
          headerTransparent: false,
          headerTitle: 'Realize o login',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: 'white'},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.dlwalt.com/faq');
              }}>
              <Icon name="help" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: Colors.whitetheme.primary},
          headerTransparent: false,
          headerTitle: 'Connect',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: 'white'},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.dlwalt.com/faq');
              }}>
              <Icon name="help" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetails}
        options={({navigation, route}) => ({
          headerStyle: {backgroundColor: Colors.whitetheme.primary},
          headerTransparent: false,
          headerTitle: route.params.project.data.apelidoProjeto,
          headerTitleAlign: 'center',
          headerTitleStyle: {color: 'white'},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.dlwalt.com/faq');
              }}>
              <Icon name="help" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PdfViewer"
        component={PdfViewer}
        options={({navigation, route}) => ({
          headerStyle: {backgroundColor: Colors.whitetheme.primary},
          headerTransparent: false,
          headerTitle: 'Visualizador de PDF',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: 'white'},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.dlwalt.com/faq');
              }}>
              <Icon name="help" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MyDocuments"
        component={MyDocuments}
        options={({navigation, route}) => ({
          headerStyle: {backgroundColor: Colors.whitetheme.primary},
          headerTransparent: false,
          headerTitle: 'Meus Documentos',
          headerTitleAlign: 'center',
          headerTitleStyle: {color: 'white'},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="arrow-back" size={30} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.dlwalt.com/faq');
              }}>
              <Icon name="help" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const Routes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initiated, setInitiated] = useState(false);
  const [logged, setLogged] = useState(false);
  const [isConnected, setisConnected] = useState(false);

  useEffect(() => {
    async function initialVerifications() {
      if (await isInitialized()) {
        setInitiated(true);
      }

      if (await isLogged()) {
        setLogged(true);
      }

      setIsLoading(false);
    }

    initialVerifications();
  });

  NetInfo.fetch().then(state => {
    setisConnected(state.isConnected);
  });

  if (isLoading) {
    return <LoadingActivity />;
  }

  if (!isConnected) {
    return <NotConnected />;
  }

  return (
    <NavigationContainer>
      <AppScreens logged={logged} initiated={initiated} />
    </NavigationContainer>
  );
};

export default Routes;
