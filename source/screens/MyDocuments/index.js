import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

import Colors from '../../global/colorScheme';
import {LoadingActivity, SimpleButton} from '../../global/Components';
import {getUserData, updateItem} from '../../services/Database';

const MyDocuments = ({navigation}) => {
  const [user, setUser] = React.useState();
  const [nomeValue, setNomeValue] = React.useState('');
  const [documentValue, setDocumentValue] = React.useState('');
  const [documentType, setDocumentType] = React.useState('cpf');
  const [rgValue, setRgValue] = React.useState('');
  const [dateValue, setDateValue] = React.useState('');
  const [maeValue, setMaeValue] = React.useState('');
  const [emailValue, setEmailValue] = React.useState('');
  const [cellValue, setCellValue] = React.useState('');
  const [endValue, setEndValue] = React.useState('');
  const [profValue, setProfValue] = React.useState('');
  const [ocupValue, setOcupValue] = React.useState('');
  const [rendaValue, setRendaValue] = React.useState('');
  const [patriValue, setPatriValue] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const loadData = async () => {
    setLoading(true);
    const userdata = await getUserData();
    console.log(userdata);
    setUser(userdata);
    setDocumentType(userdata.data.cpf ? 'cpf' : 'cnpj');
    setNomeValue(userdata.data.nomeComp || userdata.data.nomeFantasia);
    setDocumentValue(userdata.data.cpf || userdata.data.cnpj);
    setRgValue(userdata.data.rg);
    setDateValue(userdata.data.dataNasc);
    setMaeValue(userdata.data.nomeMae);
    setEmailValue(userdata.data.email);
    setCellValue(userdata.data.celular);
    setEndValue(userdata.data.endCompleto);
    setProfValue(userdata.data.profissao);
    setOcupValue(userdata.data.ocupacao);
    setRendaValue(userdata.data.renda);
    setPatriValue(userdata.data.patrimonio);
    setLoading(false);
  };

  const updateDocs = () => {
    setLoading(true);
    let newDocs;
    if (user.data.cpf) {
      newDocs = {
        nomeComp: nomeValue,
        cpf: documentValue,
        rg: rgValue,
        dataNasc: dateValue,
        nomeMae: maeValue,
        email: emailValue,
        celular: cellValue,
        endCompleto: endValue,
        profissao: profValue,
        ocupacao: ocupValue,
        renda: rendaValue,
        patrimonio: patriValue,
      };
    } else {
      newDocs = {
        nomeFantasia: nomeValue,
        cnpj: documentValue,
        email: emailValue,
        celular: cellValue,
        endCompleto: endValue,
        renda: rendaValue,
        patrimonio: patriValue,
      };
    }

    updateItem({
      path: `/gestaoempresa/business/${user.data.business}/customers/${user.key}`,
      params: newDocs,
    });
    ToastAndroid.show('Dados atualizados.', ToastAndroid.SHORT);
    setLoading(false);
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await loadData();
    });
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return <LoadingActivity />;
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.items}>
            {user && user.data.nomeComp ? 'Nome completo' : 'Nome fantasia'}
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nome Completo"
            placeholderTextColor={Colors.whitetheme.primary}
            value={nomeValue}
            onChangeText={text => {
              setNomeValue(text);
            }}
          />
          <Text style={styles.items}>
            {user && user.data.cpf ? 'CPF' : 'CNPJ'}
          </Text>
          <TextInputMask
            style={styles.textInput}
            placeholder="CPF"
            placeholderTextColor={Colors.whitetheme.primary}
            type={documentType}
            value={documentValue}
            onChangeText={text => {
              setDocumentValue(text);
            }}
          />
          {user.data.cpf ? (
            <>
              <Text style={styles.items}>RG</Text>
              <TextInput
                style={styles.textInput}
                placeholder="RG"
                placeholderTextColor={Colors.whitetheme.primary}
                value={rgValue}
                onChangeText={text => {
                  setRgValue(text);
                }}
              />
              <Text style={styles.items}>Data de Nascimento</Text>
              <TextInputMask
                style={styles.textInput}
                placeholder="Data de nascimento"
                placeholderTextColor={Colors.whitetheme.primary}
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
                value={dateValue}
                onChangeText={text => {
                  setDateValue(text);
                }}
              />
              <Text style={styles.items}>Nome da Mãe</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Nome da mãe"
                placeholderTextColor={Colors.whitetheme.primary}
                value={maeValue}
                onChangeText={text => {
                  setMaeValue(text);
                }}
              />
            </>
          ) : (
            ''
          )}

          <Text style={styles.items}>E-mail</Text>
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            placeholderTextColor={Colors.whitetheme.primary}
            value={emailValue}
            onChangeText={text => {
              setEmailValue(text);
            }}
          />
          <Text style={styles.items}>Celular</Text>
          <TextInputMask
            style={styles.textInput}
            placeholder="Celular"
            placeholderTextColor={Colors.whitetheme.primary}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '+55 (99) ',
            }}
            value={cellValue}
            onChangeText={text => {
              setCellValue(text);
            }}
          />
          <Text style={styles.items}>Endereço completo</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Endereço Completo"
            placeholderTextColor={Colors.whitetheme.primary}
            value={endValue}
            onChangeText={text => {
              setEndValue(text);
            }}
          />

          {user.data.cpf ? (
            <>
              <Text style={styles.items}>Profissão</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Profissão"
                placeholderTextColor={Colors.whitetheme.primary}
                value={profValue}
                onChangeText={text => {
                  setProfValue(text);
                }}
              />
              <Text style={styles.items}>Ocupação</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Ocupação"
                placeholderTextColor={Colors.whitetheme.primary}
                value={ocupValue}
                onChangeText={text => {
                  setOcupValue(text);
                }}
              />
            </>
          ) : (
            ''
          )}

          <Text style={styles.items}>Renda Mensal</Text>
          <TextInputMask
            style={styles.textInput}
            placeholder="Renda mensal"
            placeholderTextColor={Colors.whitetheme.primary}
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
              suffixUnit: '',
            }}
            value={rendaValue}
            onChangeText={text => {
              setRendaValue(text);
            }}
          />
          <Text style={styles.items}>Patrimônio</Text>
          <TextInputMask
            style={styles.textInput}
            placeholder="Patrimônio"
            placeholderTextColor={Colors.whitetheme.primary}
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
              suffixUnit: '',
            }}
            value={patriValue}
            onChangeText={text => {
              setPatriValue(text);
            }}
          />

          <SimpleButton
            value="Atualizar"
            type={'primary'}
            onPress={() => updateDocs()}
          />
        </View>
      </ScrollView>
    );
  }
};

const styles = new StyleSheet.create({
  container: {
    backgroundColor: Colors.whitetheme.backgroundColor,
    padding: 10,
    paddingBottom: 100,
    flex: 1,
  },
  items: {color: '#6a6a6b', marginLeft: 15, fontWeight: 'bold'},
  textInput: {
    margin: 10,
    width: Dimensions.get('window').width - 40,
    borderColor: Colors.whitetheme.primary,
    placeholderTextColor: Colors.whitetheme.primary,
    color: Colors.whitetheme.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 25,
  },
});

export default MyDocuments;
