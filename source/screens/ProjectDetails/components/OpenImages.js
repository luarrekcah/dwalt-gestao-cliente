import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles';
import {getAllItems} from '../../../services/Database';

const OpenImages = ({
  project,
  deleteImage,
  setViewerURI,
  setIsVisibleImageViewer,
  pickImages,
}) => {
  const [allMedia, setAllMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const media = await getAllItems({
      path: `gestaoempresa/business/${project.data.business}/projects/${project.key}/photos`,
    });
    setAllMedia(media);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const RenderImages = () => {
    return allMedia.map((item, index) => (
      <TouchableOpacity
        key={index}
        onLongPress={() => {
          Alert.alert(
            'Apagar Imagem',
            'Tem certeza que deseja apagar essa imagem?',
            [
              {
                text: 'Não',
                onPress: () => console.log('Cancel'),
                style: 'cancel',
              },
              {text: 'Sim', onPress: () => deleteImage(item)},
            ],
          );
        }}
        onPress={() => {
          setViewerURI(item.data.url);
          setIsVisibleImageViewer(true);
        }}>
        <ImageBackground
          style={styles.backgroundImagePhoto}
          source={{uri: item.data.url}}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView horizontal>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <RenderImages />
      )}
      <TouchableOpacity style={styles.iconAdd} onPress={pickImages}>
        <Icon name="plus" size={40} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default OpenImages;
