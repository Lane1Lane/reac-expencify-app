import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';
import { startEditAccount } from '../actions/accounts';
import { setLastExpense } from '../actions/filters';

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.startEditAccount(expense.account, {'amount': this.props.accounts.find((account) => account.id === expense.account).amount + expense.amount});
    this.props.setLastExpense(expense.account, expense.createdAt);
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Добавить расходы</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            onSubmit={this.onSubmit}
          />
        </div> 
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense)),
  startEditAccount: (id, account) => dispatch(startEditAccount(id, account)),
  setLastExpense: (account, createdAt) => dispatch(setLastExpense(account, createdAt))
});

const mapStateToProps = (state) => ({
  accounts: state.accounts
});


export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);
