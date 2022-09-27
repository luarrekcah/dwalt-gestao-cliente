import React from 'react';
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import Colors from '../../global/colorScheme';
import {TextSection} from '../../global/Components';

const Business = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.bussinessLogo}
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
          }}
        />
        <Text style={styles.bussinessName}>D Walt Engenharia</Text>
        <TextSection value="Sobre a empresa" />
        <Text style={styles.bussinessDesc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          sapien ipsum, rutrum at tempus at, feugiat sed est. Praesent placerat
          elit nisl, ut commodo dolor porta quis. In egestas diam non turpis
          laoreet, in imperdiet leo lobortis. Duis pulvinar nisl nec dignissim
          tempus. Nunc semper ex neque, non mattis dui tempor sed. Fusce blandit
          ante in dignissim maximus. Phasellus blandit hendrerit ligula
          elementum semper. Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. In est est, scelerisque vitae laoreet in, tristique ac dui.
          Proin porttitor ipsum congue leo pharetra, vitae commodo mi fringilla.
          Morbi erat diam, placerat vitae arcu a, facilisis tincidunt ipsum.
          Donec luctus bibendum iaculis. Nullam aliquam dapibus magna, id ornare
          neque hendrerit at. Donec at tortor erat. Fusce luctus purus vel
          lectus dapibus efficitur. Nullam fringilla, lacus non molestie
          consectetur, justo arcu varius massa, id commodo metus diam a est. Nam
          in dolor sit amet magna varius feugiat. Sed suscipit quam eu varius
          egestas. Nunc eget sagittis arcu. Pellentesque neque nisl, lobortis
          sed erat eu, laoreet vestibulum elit. Cras sit amet quam orci. Cras
          tincidunt nisi et lectus pulvinar ullamcorper.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    padding: 10,
  },
  bussinessLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    margin: 30,
  },
  bussinessName: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.whitetheme.primary,
  },
  bussinessDesc: {
    fontSize: 15,
    color: '#000000',
  },
});

export default Business;
