import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../global/colorScheme';
import {LoadingActivity, TextSection} from '../../global/Components';
import {getUserData} from '../../services/Database';
import {Rating} from 'react-native-ratings';

import moment from '../../vendors/moment';

const Review = ({navigation}) => {
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const [Velocidade, setVelocidade] = React.useState('');

  const [Atendimento, setAtendimento] = React.useState('');

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

  const ratingCards = [
    {
      title: 'Atendimento',
      onFinishRating: rating => {
        setAtendimento(rating);
      },
    },
    {
      title: 'Velocidade',
      onFinishRating: rating => {
        setVelocidade(rating);
      },
    },
  ];

  if (loading) {
    return <LoadingActivity />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          {ratingCards.map((item, index) => {
            return (
              <View key={index + 1} style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Rating
                  showRating
                  onFinishRating={item.onFinishRating}
                  style={styles.ratingCard}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
};

const styles = new StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    borderColor: '#9d9d9e',
    borderWidth: 2,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
  },
  cardTitle: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingCard: {
    paddingVertical: 10,
  },
});

export default Review;
