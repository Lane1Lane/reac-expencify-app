const categoriesReducerDefaultState = [];

export default (state = categoriesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_CATEGORY':
            return [
                ...state,
                action.category
            ]
        case 'EDIT_CATEGORY': 
        return state.map((category) => {
            if (category.value === action.id) {
              return {
                ...category,
                ...action.updates
              }
            } else {
              return category;
            }
          })
        case 'REMOVE_CATEGORY': 
          return state.filter((category) => category.value !== action.id)
        case 'SET_CATEGORIES': 
            return action.categories;
        default:
            return state;
    }
}