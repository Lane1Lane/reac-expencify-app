import moment from 'moment';

export default (expenses, { accounts, text, sortBy = 'date', startDate, endDate }) => {
    return expenses.filter((expense) => {
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
      const accountMatch = accounts.map((account) => account.value).indexOf(expense.account);
      
      return startDateMatch && endDateMatch && textMatch && (accountMatch !== -1);
    }).sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt - a.createdAt;
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      }
    });
  };