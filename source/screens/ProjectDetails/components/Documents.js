import React, {useEffect} from 'react';
import {ActivityIndicator, Linking, ScrollView, Text} from 'react-native';
import {DocumentCard} from '../../../global/Components';
import {getAllItems} from '../../../services/Database';

const Documents = ({project}) => {
  const [allDocuments, setAllDocuments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const loadData = async () => {
    setLoading(true);
    setAllDocuments(
      await getAllItems({
        path: `gestaoempresa/business/${project.data.business}/projects/${project.key}/documents`,
      }),
    );
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  const RenderDocuments = () => {
    return allDocuments.map((item, index) => {
      return (
        <DocumentCard
          key={index}
          title={item.data.documentName}
          haveContent={true}
          onPressView={
            () => Linking.openURL(item.data.documentURL)
            /*navigation.navigate('PdfViewer', {
                source: {
                  uri: item.data.documentURL,
                },
              })*/
          }
        />
      );
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  } else {
    return (
      <ScrollView horizontal>
        {allDocuments.length !== 0 ? (
          <RenderDocuments />
        ) : (
          <Text style={{color: '#000000'}}>
            Sem documentos, precisa ser adicionado pela empresa
          </Text>
        )}
      </ScrollView>
    );
  }
};

export default Documents;
