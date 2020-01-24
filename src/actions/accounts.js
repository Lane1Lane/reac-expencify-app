import database from '../firebase/firebase';

export const addAccount = (account) => ({
    type: 'ADD_ACCOUNT',
    account
  });

export const startAddAccount = (accountData = {}) => {
  return (dispatch,getState) => {
    const uid = getState().auth.uid;
    const {
      name = '',
      amount = 0
    } = accountData;
    const account = {name, amount};
    database.ref(`users/${uid}/accounts`).push(account).then((ref) => {
      dispatch(addAccount({
        id: ref.key,
        ...account
      }));
    })
  };
};

export const setAccounts = (accounts) => ({
  type: 'SET_ACCOUNTS',
  accounts
});

export const startSetAccounts = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/accounts`).once('value', (snapshot) => {
      const accounts = [];
      snapshot.forEach((oneSnap) => {
        accounts.push({
          id: oneSnap.key,
          ...oneSnap.val()
        });
      });
      dispatch(setAccounts(accounts));
    });
  };
};