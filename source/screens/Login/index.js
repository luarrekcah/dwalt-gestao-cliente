import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../global/colorScheme';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <Text style={styles.title}>Login rápido e fácil</Text>
        <Text style={styles.text}>
          Clique no botão de login pelo Google para acessar rapidamente o app.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whitetheme.primary,
    padding: 50,
  },
  items: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Login;
