import React from 'react';
import {Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import {LoadingActivity} from '../../global/Components';
import {getUserData} from '../../services/Database';

const SurveyHistoric = ({navigation}) => {
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
          <Text>AA</Text>
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

export default SurveyHistoric;
