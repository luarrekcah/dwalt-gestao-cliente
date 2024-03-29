import React from 'react';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import Colors from '../../global/colorScheme';
import {LoadingActivity, TextSection} from '../../global/Components';
import {useBusiness} from '../../hooks/BusinessContext';

const Business = ({navigation}) => {
  const {business, setBusiness} = useBusiness();

  if (!business) {
    return <LoadingActivity />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            style={styles.bussinessLogo}
            source={{
              uri: business.data.info.profile.logo,
            }}
          />
          <Text style={styles.bussinessName}>
            {business.data.info.documents.nome_fantasia}
          </Text>
          <TextSection value="Sobre a empresa" />
          <Text style={styles.bussinessDesc}>
            {business.data.info.profile.about}
          </Text>
          <TextSection value="Documentos - CNPJ" />
          <Text style={styles.bussinessDesc}>
            {business.data.info.documents.nome_fantasia} -{' '}
            {business.data.info.documents.cnpj}
          </Text>
          <TextSection value="Localização" />
          <Text style={styles.bussinessDesc}>
            {business.data.info.profile.mainLocation}
          </Text>
          <TextSection value="Proprietário(a)" />
          <Text style={styles.bussinessDesc}>
            {business.data.info.profile.ownerName}
          </Text>
          <TextSection value="Data de registro na plataforma" />
          <Text style={styles.bussinessDesc}>
            {business.data.info.createdAt}
          </Text>
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
    borderRadius: 20,
  },
  bussinessName: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.whitetheme.primary,
  },
  bussinessDesc: {
    fontSize: 15,
    color: '#000000',
  },
});

export default Business;
