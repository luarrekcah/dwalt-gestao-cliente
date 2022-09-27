import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../global/colorScheme';
import {Button, TextSection} from '../../global/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Business = ({navigation}) => {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      const userdata = JSON.parse(data);
      console.log(userdata);
      setUser(userdata);
    });
  }, []);

  if (user === undefined) {
    return <Text>Carregando</Text>;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            style={styles.bussinessLogo}
            source={{
              uri: user.foto,
            }}
          />
          <Text style={styles.bussinessName}>
            {user.nome + ' ' + user.sobrenome}
          </Text>
          <View style={styles.emailBackground}>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <TextSection value="Conta" />
          <Button icon="logout" value="Sair da Conta" />
          <TextSection value="Outros" />
          <Button icon="info" value="Termos de Uso" />
          <Button icon="info" value="Política de Privacidade" />
          <Button icon="warning" value="Relatar Problema" />
          <Button icon="android" value="Versão" description="v1.0.0" />
        </ScrollView>
      </View>
    );
  }
};

const styles = new StyleSheet.create({
  container: {
    padding: 10,
  },
  bussinessLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    margin: 30,
    borderRadius: 30,
  },
  bussinessName: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.whitetheme.primary,
  },
  bussinessDesc: {
    fontSize: 15,
  },
  emailBackground: {
    backgroundColor: Colors.whitetheme.gray,
    borderRadius: 20,
    width: 300,
    alignSelf: 'center',
  },
  email: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
  },
});

export default Business;
