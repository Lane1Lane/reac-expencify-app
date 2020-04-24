import moment from 'moment';

export default (expenses, { accounts, categories, text, sortBy = 'date', startDate, endDate, types }) => {
    return expenses.filter((expense) => {
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
      
      let accountMatch = 0;
      if (accounts.length) {
        accountMatch = ~accounts.map((account) => account.value).indexOf(expense.account);
      } else {accountMatch = 1};

      // console.log(accountMatch);
      
      let categoriesMatch = 0;
      if (categories.length) {
        if (expense.category) {categoriesMatch = categories.map((category) => ~expense.category.split(',').indexOf(category.value)).reduce((sum, current) => sum + current, 0)};
      } else {categoriesMatch = 1};
      

      let typesMatch = 0;
      if (types.length) {
        typesMatch = ~types.map((type) => type.value).indexOf(expense.expenseType);
      } else {typesMatch = 1};
      
      return startDateMatch && endDateMatch && textMatch && accountMatch && categoriesMatch && typesMatch;
    }).sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt - a.createdAt;
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      }
    }).sort((a, b) => {
        return b.realCreatedAt - a.realCreatedAt;
    });
  };