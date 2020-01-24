const accountsReducerDefaultState = [];

export default (state = accountsReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_ACCOUNT':
            return [
                ...state,
                action.account
            ]
        case 'EDIT_ACCOUNT': 
            return {}
        case 'REMOVE_ACCOUNT': 
            return {}
        case 'SET_ACCOUNTS': 
            return action.accounts;
        default:
            return state;
    }
}