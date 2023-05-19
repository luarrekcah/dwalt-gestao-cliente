import React from 'react';
import {Linking, ScrollView, Text, View} from 'react-native';
import {Button, LoadingActivity, TextSection} from '../../global/Components';
import {onLogoutPress} from '../../services/Auth';
import {version} from '../../../package.json';

import {useUserData} from '../../hooks/useUserData';

import styles from './styles';

import {useUser} from '../../hooks/UserContext';

const Business = ({navigation}) => {
  const {user, setUser} = useUser();

  if (!user) {
    return <LoadingActivity />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          {user.data.cpf ? (
            <Text style={styles.bussinessName}>{user.data.nomeComp}</Text>
          ) : (
            <Text style={styles.bussinessName}>{user.data.nomeFantasia}</Text>
          )}

          <View style={styles.emailBackground}>
            {user.data.cpf ? (
              <Text style={styles.email}>CPF: {user.data.cpf}</Text>
            ) : (
              <Text style={styles.email}>CNPJ: {user.data.cnpj}</Text>
            )}
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

export default Business;
