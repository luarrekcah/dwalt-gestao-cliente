import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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

export const Button = ({
  icon = 'info',
  value,
  description,
  onPress,
  ...rest
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Icon name={icon} size={25} color={Colors.whitetheme.primary} />
      <View>
        <Text style={styles.buttonText}>{value}</Text>
        <Text style={styles.buttonDesc}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const LoadingActivity = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color={Colors.whitetheme.primary} />
    </View>
  );
};

const styles = new StyleSheet.create({
  textSection: {
    color: Colors.whitetheme.gray,
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 20,
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
  button: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 15,
    marginVertical: 20,
  },
  buttonText: {
    color: Colors.whitetheme.primary,
    fontSize: 15,
    marginLeft: 20,
  },
  buttonDesc: {
    color: Colors.whitetheme.gray,
    fontSize: 12,
    marginLeft: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
