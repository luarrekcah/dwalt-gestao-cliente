import database from '@react-native-firebase/database';
import {getUserAuth} from './Auth';

export const getDate = moment => {
  return moment().format();
};

export const createItem = ({path, params}) => {
  if (!path || !params) {
    return {error: 'Sem path'};
  }
  if (path.includes('undefined')) {
    return console.warn('Path recebendo valor indefinido');
  }
  database().ref(path).push(params);
};

export const deleteItem = ({path}) => {
  if (!path) {
    return console.warn('Sem path ou params!');
  }
  if (path.includes('undefined')) {
    return console.warn('Path recebendo valor indefinido');
  }
  database().ref(path).remove();
};

export const updateItem = ({path, params}) => {
  if (!path || !params) {
    return {error: 'Sem path'};
  }
  if (path.includes('undefined')) {
    return console.warn('Path recebendo valor indefinido');
  }
  database().ref(path).update(params);
};

export const getItems = async ({path}) => {
  if (!path) {
    return {error: 'Sem path'};
  }
  if (path.includes('undefined')) {
    return console.warn('Path recebendo valor indefinido');
  }
  const items = await database()
    .ref(path)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });
  return items;
};

export const getAllItems = async ({path}) => {
  if (!path) {
    return {error: 'Sem path'};
  }
  if (path.includes('undefined')) {
    return console.warn('Path recebendo valor indefinido');
  }
  const allItems = await database()
    .ref(path)
    .once('value')
    .then(snapshot => {
      let alldata = [];
      snapshot.forEach(childSnapshot => {
        let key = childSnapshot.key,
          data = childSnapshot.val();
        alldata.push({key, data});
      });
      return alldata;
    });
  return allItems;
};

export const getBusinessData = async () => {
  const userLocal = await getUserAuth();
  const businessData = await database()
    .ref(`gestaoempresa/business/${userLocal.businessKey}`)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });
  const data = {data: businessData, key: userLocal.businessKey};
  return data;
};

export const getGrowattData = async () => {
  const userLocal = await getUserAuth();
  const growatt = await getItems({
    path: `gestaoempresa/business/${userLocal.businessKey}/growatt`,
  });
  return growatt;
};

export const getUserData = async () => {
  const userLocal = await getUserAuth();
  console.log(userLocal);
  const userCloud = await getItems({
    path: `/gestaoempresa/business/${userLocal.businessKey}/customers/${userLocal.userKey}`,
  });
  return {key: userLocal.userKey, data: userCloud};
};

export const getSurveyData = async () => {
  const userLocal = await getUserAuth();
  const userCloud = await getItems({
    path: `/gestaoempresa/business/${userLocal.businessKey}/customers/${userLocal.userKey}`,
  });
  const surveys = await getAllItems({
    path: `/gestaoempresa/business/${userLocal.businessKey}/surveys`,
  });
  const onlyuser = surveys.filter(i => {
    if (
      i.data.customer === undefined ||
      i.data.customer.document === undefined
    ) {
      return;
    }
    if (
      userCloud.cpf &&
      i.data.customer.document.replaceAll('-', '').replaceAll('.', '') ===
        userCloud.cpf.replaceAll('-', '').replaceAll('.', '')
    ) {
      return i;
    }

    if (
      userCloud.cnpj &&
      i.data.customer.document.replaceAll('-', '').replaceAll('.', '') ===
        userCloud.cnpj.replaceAll('-', '').replaceAll('.', '')
    ) {
      return i;
    }
  });

  console.log(onlyuser);

  return onlyuser || [];
};

export const getComplaintData = async () => {
  const userLocal = await getUserAuth();
  const userCloud = await getItems({
    path: `/gestaoempresa/business/${userLocal.businessKey}/customers/${userLocal.userKey}`,
  });
  const complaints = await getAllItems({
    path: `/gestaoempresa/business/${userLocal.businessKey}/complaints`,
  });
  const onlyuser = complaints.filter(i => {
    if (
      i.data.customer === undefined ||
      i.data.customer.document === undefined
    ) {
      return;
    }
    if (
      userCloud.cpf &&
      i.data.customer.document.replaceAll('-', '').replaceAll('.', '') ===
        userCloud.cpf.replaceAll('-', '').replaceAll('.', '')
    ) {
      return i;
    }

    if (
      userCloud.cnpj &&
      i.data.customer.document.replaceAll('-', '').replaceAll('.', '') ===
        userCloud.cnpj.replaceAll('-', '').replaceAll('.', '')
    ) {
      return i;
    }
  });
  return onlyuser || [];
};

export const getProjectsData = async () => {
  const userLocal = await getUserAuth();
  const projects = await getAllItems({
    path: `/gestaoempresa/business/${userLocal.businessKey}/projects`,
  });
  const userProjects = projects.filter(
    i => i.data.customerID === userLocal.userKey,
  );
  return userProjects;
};
