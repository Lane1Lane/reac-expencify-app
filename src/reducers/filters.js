import moment from 'moment';
import { connect } from 'react-redux';
moment.locale('uk');

const filterReducerDefaultState = {
    text: '',
    sortBy: 'date', // date or amount
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    accounts: [],
    updateAccounts: true,
    categories: [],
    types: [{label: 'Расход', value: -1}],
    expenseTypes: [{text: 'Расход', value: -1},{text: 'Доход', value: 1}],
    showFilters: false
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
    case 'SET_CATEGORY_FILTER':
    return {
        ...state,
        categories: action.categories
    }
    case 'SET_TYPES_FILTER':
    return {
        ...state,
        types: action.types
    }
    case 'SET_SHOW_FILTERS':
    return {
        ...state,
        showFilters: !state.showFilters
    }
    default:
    return state;
};
};


