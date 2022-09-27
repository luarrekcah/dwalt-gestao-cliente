import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from './colorScheme';

export const TextSection = ({value}) => {
  return <Text style={styles.textSection}>{value}</Text>;
};

export const MiniCard = ({
  iconName,
  iconSize = 40,
  iconColor = '#fff',
  textValue,
}) => {
  return (
    <View style={styles.miniCard}>
      <Icon name={iconName} size={iconSize} color={iconColor} />
      <Text style={styles.textCard}>{textValue}</Text>
    </View>
  );
};

const styles = new StyleSheet.create({
  textSection: {
    color: Colors.whitetheme.gray,
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  miniCard: {
    backgroundColor: Colors.whitetheme.primary,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 10,
    width: 100,
  },
  textCard: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
