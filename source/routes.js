import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from './global/colorScheme';

import Intro from './screens/Intro';
import Login from './screens/Login';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          name="Intro"
          component={Intro}
          options={({navigation}) => ({
            headerStyle: {backgroundColor: Colors.whitetheme.primary},
            headerTransparent: true,
            headerTitle: 'D | Walt Gestão',
            headerTitleAlign: 'center',
            headerTitleStyle: {color: 'white'},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://geeknote.devluar.com/ajuda');
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
                  Linking.openURL('https://geeknote.devluar.com/ajuda');
                }}>
                <Icon name="help" size={30} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;