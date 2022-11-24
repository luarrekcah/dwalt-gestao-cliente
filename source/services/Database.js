import database from '@react-native-firebase/database';
import {getUserAuth} from './Auth';

export const createItem = ({path, params}) => {
  if (!path || !params) {
    return {error: 'Sem path'};
  }
  database().ref(path).push(params);
};

export const updateItem = ({path, params}) => {
  if (!path || !params) {
    return {error: 'Sem path'};
  }
  database().ref(path).update(params);
};

export const getItems = async ({path}) => {
  if (!path) {
    return {error: 'Sem path'};
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

export const getUserData = async () => {
  const userLocal = await getUserAuth();
  const customers = await getAllItems({
    path: `/gestaoempresa/business/${userLocal.businessKey}/customers`,
  });
  const user = await customers.find(item => {
    return item.data._id === userLocal._id;
  });
  return user;
};

export const getSurveyData = async () => {
  const userLocal = await getUserAuth();
  const surveys = await getAllItems({
    path: `/gestaoempresa/business/${userLocal.businessKey}/surveys`,
  });
  const onlyuser = surveys.filter(i => i.data.owner === userLocal.email);
  console.log(onlyuser);
  return onlyuser;
};

export const getProjectsData = async () => {
  const userLocal = await getUserAuth();
  const projects = await getAllItems({
    path: `/gestaoempresa/business/${userLocal.businessKey}/projects`,
  });
  return projects;
};
