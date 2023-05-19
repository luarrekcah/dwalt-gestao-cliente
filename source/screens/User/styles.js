import {StyleSheet} from 'react-native';
import Colors from '../../global/colorScheme';

const styles = new StyleSheet.create({
  container: {
    padding: 10,
  },
  bussinessLogo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    margin: 30,
    borderRadius: 30,
  },
  bussinessName: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.whitetheme.primary,
  },
  bussinessDesc: {
    fontSize: 15,
  },
  emailBackground: {
    backgroundColor: Colors.whitetheme.gray,
    borderRadius: 20,
    width: 300,
    alignSelf: 'center',
  },
  email: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
  },
});

export default styles;
