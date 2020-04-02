import moment from 'moment';

export default (expenses, { accounts, categories, text, sortBy = 'date', startDate, endDate }) => {
    return expenses.filter((expense) => {
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
      let accountMatch = 0;
      if (accounts.lenght) {
        accountMatch = ~accounts.map((account) => account.value).indexOf(expense.account);
      } else {accountMatch = 1};
      let categoriesMatch = 0;
      if (categories.length) {
        if (expense.category) {categoriesMatch = categories.map((category) => ~expense.category.split(',').indexOf(category.value)).reduce((sum, current) => sum + current, 0)};
      } else {categoriesMatch = 1};
      return startDateMatch && endDateMatch && textMatch && accountMatch && categoriesMatch;
    }).sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt - a.createdAt;
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      }
    });
  };