import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles';

const GeneralInfos = ({project}) => {
  return (
    <View>
      <Text style={[styles.bottomStatus, {color: '#000000'}]}>
        <Icon name="alert-circle" size={20} color="#0d5bd9" />{' '}
        {project.data.RStatus === '' || project.data.RStatus === undefined
          ? 'Sem observação de Status'
          : project.data.RStatus}
      </Text>
      <Text style={[styles.bottomStatus, {color: '#000000'}]}>
        <Icon name="truck-fast" size={20} color="#0d5bd9" />{' '}
        {project.data.statusRastreio === '' ||
        project.data.statusRastreio === undefined
          ? 'Rastreio indisponível'
          : project.data.statusRastreio}
      </Text>
      <Text style={[styles.bottomStatus, {color: '#000000'}]}>
        <Icon name="wifi" size={20} color="#0d5bd9" />{' '}
        {project.data.username_growatt === '' ||
        project.data.username_growatt === undefined
          ? 'Sem nome de usuário growatt'
          : project.data.username_growatt}
      </Text>
    </View>
  );
};

export default GeneralInfos;
