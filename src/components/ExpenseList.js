import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
import accounts from '../reducers/accounts';

export const ExpenseList = (props) => {
  console.log('from ExpenseList',props.filters)
  return <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Расходы</div>
      <div className="show-for-desktop">Расход</div>
      <div className="show-for-desktop">Сумма</div>
    </div>
    <div className="list-body">
      {
        
        props.expenses.length === 0 ? (
          <div className="list-item list-item--mesaage">
            <span>Нет транзакций</span>
          </div>
        ) : (
            props.expenses.map((expense) => {
              return <ExpenseListItem key={expense.id} accountNamed={props.accounts.find((account) => account.id === expense.account).name} {...expense}/>;
            })
          )
      }
    </div>
  </div>
};

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
    accounts: state.accounts,
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseList);
