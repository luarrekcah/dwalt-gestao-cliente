import React from 'react';
import {Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles';

const imagesDevices = {
  growatt: {
    7: 'https://belenergy.com.br/wp-content/uploads/2021/02/Inversor_Growatt_MIN_1.png',
  },
};

const brands = {
  growatt: 'https://indykoning.nl/wp-content/uploads/2020/01/Growatt-G.png',
};

const DeviceInfos = ({project}) => {
  const RenderDevices = () => {
    return project.data.overview.devices.map((device, i) => {
      return (
        <View
          key={i}
          style={[
            styles.row,
            {
              padding: 20,
              marginVertical: 15,
              borderColor: '#2556b0',
              borderWidth: 2,
              borderRadius: 20,
            },
          ]}>
          <View>
            <Image
              style={{width: 50, height: 50}}
              source={{
                uri: imagesDevices[
                  project.data.brand || project.data.typeInverter || 'growatt'
                ][device.type],
              }}
            />
          </View>
          <View>
            <Image
              style={{width: 50, height: 50}}
              source={{
                uri: brands[
                  project.data.brand || project.data.typeInverter || 'growatt'
                ],
              }}
            />
          </View>
          <View>
            <Text style={{color: '#000'}}>Marca: {device.manufacturer}</Text>
            <Text style={{color: '#000'}}>
              Status: {device.lost ? 'Off-line' : 'On-line'}
            </Text>
            <Text style={{color: '#000'}}>
              <Icon name="update" size={20} color="#000000" />{' '}
              {device.last_update_time}
            </Text>
          </View>
        </View>
      );
    });
  };

  return (
    <View>
      {project.data.overview.devices.length === 0 ? (
        <Text style={{color: '#000'}}>
          Nenhum aparelho encontrado, tente mais tarde.
        </Text>
      ) : (
        <RenderDevices />
      )}
    </View>
  );
};

export default DeviceInfos;
