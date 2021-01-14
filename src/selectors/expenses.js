import moment from 'moment';

export default (expenses, { accounts, categories, text, sortBy = 'date', startDate, endDate, types }) => {
    return expenses.filter((expense) => {
      const createdAtMoment = moment(expense.createdAt);
      const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
      const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
      const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
      const noteMatch = expense.note.toLowerCase().includes(text.toLowerCase());
      const amountMatch = String(expense.amount/100).includes(text.toLowerCase());
      
      let accountMatch = 0;
      if (accounts.length) {
        accountMatch = ~accounts.map((account) => account.value).indexOf(expense.account);
      } else {accountMatch = 1};

      
      let categoriesMatch = 0;
      if (categories.length) {
        if (expense.category) {categoriesMatch = categories.map((category) => ~expense.category.split(',').indexOf(category.value)).reduce((sum, current) => sum + current, 0)};
      } else {categoriesMatch = 1};
      

      let typesMatch = 0;
      if (types.length) {
        typesMatch = ~types.map((type) => type.value).indexOf(expense.expenseType);
      } else {typesMatch = 1};

      
      return text.length < 2 ? (startDateMatch && endDateMatch && accountMatch && categoriesMatch && typesMatch) : (textMatch || noteMatch || amountMatch);
    }).sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt - a.createdAt || b.realCreatedAt - a.realCreatedAt;
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      }
    });
  };