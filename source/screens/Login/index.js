import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../global/colorScheme';
import {saveUserAuth} from '../../services/Auth';
import {SimpleButton} from '../../global/Components';
import {getAllItems, updateItem} from '../../services/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const Login = ({navigation}) => {
  const [cpfValue, setCpfValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [businessEmail, setBusinessEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [businessData, setBusinessData] = React.useState(null);

  const verifyBusiness = async () => {
    if (!businessEmail.includes('@')) {
      return ToastAndroid.show('Insira um e-mail válido', ToastAndroid.SHORT);
    }
    const business = await getAllItems({path: 'gestaoempresa/business'});
    const foundBusiness = business.find(
      i => i.data.info.email === businessEmail,
    );
    if (foundBusiness) {
      setBusinessData(foundBusiness);
    } else {
      setLoading(false);
      return ToastAndroid.show('Empresa não encontrada', ToastAndroid.SHORT);
    }
  };

  const login = async () => {
    setLoading(true);
    if (cpfValue === '' || passwordValue === '' || businessEmail === '') {
      setLoading(false);
      return ToastAndroid.show('Preencha os dados', ToastAndroid.SHORT);
    }
    if (cpfValue.length <= 10) {
      setLoading(false);
      return ToastAndroid.show('Preencha os dados', ToastAndroid.SHORT);
    }
    if (businessData === null) {
      setLoading(false);
      return ToastAndroid.show(
        'Insira um e-mail válido registrado na plataforma.',
        ToastAndroid.SHORT,
      );
    } else {
      const customers = await getAllItems({
        path: `gestaoempresa/business/${businessData.key}/customers`,
      });
      const foundCustomer = customers.find(
        i =>
          i.data.cpf.replaceAll('-', '').replaceAll('.', '') ===
          cpfValue.replaceAll('-', '').replaceAll('.', ''),
      );
      if (foundCustomer) {
        if (foundCustomer.data.password === passwordValue) {
          const auth = {
            userKey: foundCustomer.key,
            businessKey: businessData.key,
          };
          saveUserAuth(auth);
          await messaging().registerDeviceForRemoteMessages();
          const token = await messaging().getToken();
          updateItem({
            path: `gestaoempresa/business/${businessData.key}/customers/${foundCustomer.key}`,
            params: {
              token,
            },
          });
          await AsyncStorage.setItem('logged', JSON.stringify({logged: true}));
          setLoading(false);
          navigation.navigate('Main');
        } else {
          setLoading(false);
          return ToastAndroid.show('Senha incorreta.', ToastAndroid.SHORT);
        }
      } else {
        setLoading(false);
        return ToastAndroid.show('Usuário não encontrado.', ToastAndroid.SHORT);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Login</Text>
        {businessData !== null ? (
          <View style={styles.confirm}>
            <Text style={styles.confirmText}>
              {businessData.data.info.documents.nome_fantasia}
            </Text>
            <Text style={styles.confirmText}>
              CNPJ: {businessData.data.info.documents.cnpj}
            </Text>
          </View>
        ) : (
          ''
        )}
        <TextInput
          style={styles.textInput}
          placeholder="E-mail da Empresa"
          placeholderTextColor="#fff"
          autoCapitalize="none"
          onBlur={verifyBusiness}
          onChangeText={text => setBusinessEmail(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="CPF"
          placeholderTextColor="#fff"
          autoCapitalize="none"
          onChangeText={text => setCpfValue(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Senha"
          secureTextEntry={true}
          placeholderTextColor="#fff"
          autoCapitalize="none"
          onChangeText={text => setPasswordValue(text)}
        />
        {!loading ? (
          <SimpleButton
            icon={'login'}
            value="Entrar"
            type={'primary'}
            onPress={() => {
              login();
            }}
          />
        ) : (
          <ActivityIndicator size="small" color="#fff" />
        )}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  confirm: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 20,
    borderRadius: 50,
    paddingHorizontal: 40,
  },
  confirmText: {color: Colors.whitetheme.primary, fontWeight: 'bold'},
  items: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 32,
    borderRadius: 10,
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
    marginBottom: 20,
  },
  textInput: {
    margin: 10,
    width: 300,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 50,
  },
});

export default Login;
