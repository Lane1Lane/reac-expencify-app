import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';
import HeaderMain from './HeaderMain'

const ExpenseDashboardPage = () => (
  <div>
    <HeaderMain/>
    <ExpenseListFilters />
    <ExpenseList />
    <ExpensesSummary />
  </div>
);

export default ExpenseDashboardPage;
