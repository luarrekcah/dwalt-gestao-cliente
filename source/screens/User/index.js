import React from 'react';
import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../global/colorScheme';
import {Button, LoadingActivity, TextSection} from '../../global/Components';
import {getUserData} from '../../services/Database';
import {onLogoutPress} from '../../services/Auth';
import {version} from '../../../package.json';

const Business = ({navigation}) => {
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const loadData = async () => {
    setLoading(true);
    setUser(await getUserData());
    setLoading(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <LoadingActivity />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.bussinessName}>{user.data.nomeComp}</Text>
          <View style={styles.emailBackground}>
            <Text style={styles.email}>CPF: {user.data.cpf}</Text>
          </View>
          <TextSection value="Conta" />
          <Button
            icon="card-account-details"
            value="Meus documentos"
            onPress={async () => {
              navigation.navigate('MyDocuments');
            }}
          />
          <Button
            icon="logout"
            value="Sair da Conta"
            onPress={async () => {
              await onLogoutPress({navigation});
            }}
          />
          <TextSection value="Outros" />
          <Button
            icon="information"
            value="Termos de Uso"
            onPress={() => {
              Linking.openURL('https://www.dlwalt.com/termos');
            }}
          />
          <Button
            icon="information"
            value="Política de Privacidade"
            onPress={() => {
              Linking.openURL('https://www.dlwalt.com/politica');
            }}
          />
          <Button
            icon="bug"
            value="Relatar Problema"
            onPress={() => {
              Linking.openURL('https://wa.me/+556892402096');
            }}
          />
          <Button icon="android" value="Versão" description={version} />
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
    width: 200,
    height: 200,
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
