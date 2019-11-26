import uuid from 'uuid';
import database from '../firebase/firebase';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
  });

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = '', 
      note = '', 
      amount = 0, 
      createdAt = 0
    } = expenseData;
    const expense = { description, note, amount, createdAt }
    database.ref('expenses').push(expense).then((ref) => {
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
  return (dispatch) => {
    database.ref(`expenses/${id}`).remove().then((expanse) => {
      dispatch(removeExpense({ id }));
    });
  };
};

export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});



export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value', (snapshot) => {
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