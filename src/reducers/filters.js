import moment from 'moment';
import { connect } from 'react-redux';
moment.locale('uk');

const filterReducerDefaultState = {
    text: '',
    sortBy: 'date', // date or amount
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    accounts: [],
    updateAccounts: true
  };
  
  export default (state = filterReducerDefaultState, action) => {
switch (action.type) {
    case 'SET_TEXT_FILTER':
    return {
        ...state,
        text: action.text
    }
    case 'SET_SORT_BY':
    return {
        ...state,
        sortBy: action.sortBy
    }
    case 'SET_START_DATE':
    return {
        ...state,
        startDate: action.startDate
    }
    case 'SET_END_DATE':
    return {
        ...state,
        endDate: action.endDate
    }
    case 'SET_ACCOUNT_FILTER':
    return {
        ...state,
        accounts: action.accounts,
        updateAccounts: action.updateAccounts
    }
    default:
    return state;
};
};


