import uuid from 'uuid';
import database from '../firebase/firebase';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
  });

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      expenseType = -1,
      category = '',
      account = '',
      description = '', 
      note = '', 
      amount = 0, 
      createdAt = 0,
      realCreatedAt = 0
    } = expenseData;
    const expense = { expenseType, category, account, description, note, amount, createdAt, realCreatedAt }
    database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    })
  } 
}
  
export const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id }) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database.ref(`users/${uid}/expenses/${id}`).update({
      ...updates
    }).then(() => {
      dispatch(editExpense(id, updates));
    });
  };
};



export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`).once('value', (snapshot) => {
      const expenses = [];
      snapshot.forEach((oneSnap) => {
        expenses.push({
          id: oneSnap.key,
          ...oneSnap.val()
        });
      });
      dispatch(setExpenses(expenses))
    });
  };
};