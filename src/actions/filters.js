export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
  });
  
export const sortByAmount = () => ({
type: 'SET_SORT_BY',
sortBy: 'amount'
});

export const sortByDate = () => ({
type: 'SET_SORT_BY',
sortBy: 'date'
});

export const setStartDate = (startDate) => ({
type: 'SET_START_DATE',
startDate
});

export const setEndDate = (endDate) => ({
type: 'SET_END_DATE',
endDate
});

export const setAccountFilter = (accounts = []) => ({
  type: 'SET_ACCOUNT_FILTER',
  accounts,
  updateAccounts: false
});

export const setCategoriesFilter = (categories = []) => ({
  type: 'SET_CATEGORY_FILTER',
  categories
});

export const setTypesFilter = (types = []) => ({
  type: 'SET_TYPES_FILTER',
  types
});

export const setShowFilters = (showFilters) => ({
  type: 'SET_SHOW_FILTERS',
  showFilters
});

export const setLastExpense = (account, createdAt) => ({
  type: 'SET_LAST_EXPENSE',
  lastExpense: { account, createdAt }
});


