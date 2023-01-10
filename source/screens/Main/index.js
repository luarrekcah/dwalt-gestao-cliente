import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';

import Colors from '../../global/colorScheme';
import Home from './components/Home';

import Business from '../Business';
import User from '../User';
import GrowattServer from '../GrowattServer';
import SurveyHistoric from '../SurveyHistoric';

const Tab = AnimatedTabBarNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#223322',
        activeBackgroundColor: Colors.whitetheme.primary,
      }}
      appearance={{
        shadow: true,
        floating: true,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Empresa') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'Usuário') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Sistema') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'Histórico') {
            iconName = focused ? 'albums' : 'albums-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Empresa" component={Business} />
      <Tab.Screen name="Histórico" component={SurveyHistoric} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Sistema" component={GrowattServer} />
      <Tab.Screen name="Usuário" component={User} />
    </Tab.Navigator>
  );
};

export default Main;
