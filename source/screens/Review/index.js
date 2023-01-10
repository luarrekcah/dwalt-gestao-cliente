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

import moment from '../../vendors/moment';

const Review = ({navigation}) => {
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
        </ScrollView>
      </View>
    );
  }
};

const styles = new StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Review;
