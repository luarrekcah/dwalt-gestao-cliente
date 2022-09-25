import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../global/colorScheme';

const CompanyLink = ({navigation}) => {
  const [value, setValue] = React.useState('');
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      const userdata = JSON.parse(data);
      console.log(userdata.nome);
      setUser(userdata);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <Text style={styles.title}>
          Quase lá{user === undefined ? '' : ' ' + user.nome}!
        </Text>
        <Text style={styles.text}>Informe o e-mail registrado da empresa</Text>
        <TextInput
          style={styles.textInput}
          placeholder="empresa@gmail.com"
          placeholderTextColor="#fff"
          autoCapitalize="none"
          onChangeText={text => setValue(text)}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Vincular</Text>
        </TouchableOpacity>
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
  textInput: {
    margin: 30,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 50,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 30,
  },
  textButton: {
    color: Colors.whitetheme.primary,
  },
});

export default CompanyLink;
