import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expences';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import accountsReducer from '../reducers/accounts';
import categoriesReducer from '../reducers/categories';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            auth: authReducer,
            accounts: accountsReducer,
            categories: categoriesReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;     
}

