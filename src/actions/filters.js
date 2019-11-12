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