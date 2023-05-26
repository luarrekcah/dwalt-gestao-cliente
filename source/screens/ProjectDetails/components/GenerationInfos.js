import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles';

const GenerationInfos = ({project}) => {
  return (
    <>
      <View
        style={[
          styles.row,
          {
            borderColor: '#2556b0',
            borderWidth: 2,
            borderRadius: 20,
            padding: 20,
          },
        ]}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={[styles.bottomStatus, {color: '#000000'}]}>
            <Icon name="calendar-today" size={30} color="#0d5bd9" />
          </Text>
          <Text style={[styles.bottomStatus, {color: '#000000', fontSize: 18}]}>
            {project.data.overview.generationHistoric.today}kW
          </Text>
          <Text style={[styles.bottomStatus, {color: '#838485'}]}>Hoje</Text>
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={[styles.bottomStatus, {color: '#000000'}]}>
            <Icon name="calendar-month" size={30} color="#0d5bd9" />
          </Text>
          <Text style={[styles.bottomStatus, {color: '#000000', fontSize: 18}]}>
            {project.data.overview.generationHistoric.month}kW
          </Text>
          <Text style={[styles.bottomStatus, {color: '#838485'}]}>
            Esse mês
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={[styles.bottomStatus, {color: '#000000'}]}>
            <Icon name="calendar-blank-multiple" size={30} color="#0d5bd9" />
          </Text>
          <Text style={[styles.bottomStatus, {color: '#000000', fontSize: 18}]}>
            {project.data.overview.generationHistoric.year}kW
          </Text>
          <Text style={[styles.bottomStatus, {color: '#838485'}]}>
            Esse ano
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <Text style={[styles.bottomStatus, {color: '#000000'}]}>
            <Icon name="lightning-bolt" size={30} color="#0d5bd9" />
          </Text>
          <Text style={[styles.bottomStatus, {color: '#000000', fontSize: 18}]}>
            {project.data.overview.total_generated}kW
          </Text>
          <Text style={[styles.bottomStatus, {color: '#838485'}]}>Total</Text>
        </View>
      </View>
      <View style={{marginTop: 5, alignItems: 'center'}}>
        <Text style={[styles.bottomStatus, {color: '#000000'}]}>
          <Icon name="update" size={20} color="#000000" />{' '}
          {project.data.overview.lastUpdateTime === '' ||
          project.data.overview.lastUpdateTime === undefined
            ? 'Sem data de atualização'
            : project.data.overview.lastUpdateTime}
        </Text>
      </View>
    </>
  );
};

export default GenerationInfos;
