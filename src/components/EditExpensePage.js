import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import { startEditAccount } from '../actions/accounts';
import { setLastExpense } from '../actions/filters';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    const amountBefore = this.props.accounts.find((account) => account.id === this.props.expense.account).amount;
    this.props.setLastExpense(expense.account, expense.createdAt);
    if (this.props.expense.account !== expense.account) {
      this.props.startEditAccount(this.props.expense.account, {amount: (amountBefore - this.props.expense.amount)});
      this.props.startEditAccount(expense.account, {amount: this.props.accounts.find((account) => account.id === expense.account).amount + expense.amount});
    } else {
      this.props.startEditAccount(this.props.expense.account, {'amount': amountBefore - this.props.expense.amount + expense.amount});
    }
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.startEditAccount(this.props.expense.account, {'amount': this.props.accounts.find((account) => account.id === this.props.expense.account).amount - this.props.expense.amount});
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Изменение расхода</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onRemove}>Удалить</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id),
  accounts: state.accounts
});

const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  removeExpense: (data) => dispatch(startRemoveExpense(data)),
  startEditAccount: (id, account) => dispatch(startEditAccount(id, account)),
  setLastExpense: (account, createdAt) => dispatch(setLastExpense(account, createdAt))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
