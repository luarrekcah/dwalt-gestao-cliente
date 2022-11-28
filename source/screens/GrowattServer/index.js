import React from 'react';
import {WebView} from 'react-native-webview';

const GrowattServer = ({navigation}) => {
  return <WebView source={{uri: 'https://server.growatt.com/login'}} />;
};

export default GrowattServer;
