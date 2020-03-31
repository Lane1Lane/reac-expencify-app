const categoriesReducerDefaultState = [];

export default (state = categoriesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_CATEGORY':
            return [
                ...state,
                action.category
            ]
        case 'EDIT_CATEGORY': 
            return {}
        case 'REMOVE_CATEGORY': 
            return {}
        case 'SET_CATEGORIES': 
            return action.categories;
        default:
            return state;
    }
}