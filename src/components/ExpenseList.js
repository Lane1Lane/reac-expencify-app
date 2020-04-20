import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
import moment from 'moment';
moment.locale('ru');


export const ExpenseList = (props) => {
  return <div className="content-container">
    {/* <div className="list-header">
      <div className="show-for-mobile">Расходы</div>
      <div className="show-for-desktop">Расход</div>
      <div className="show-for-desktop">Сумма</div>
    </div> */}
    <div className="list-body">
      {
        
        props.expenses.length === 0 ? (
          <div className="list-item list-item--mesaage">
            <span>Нет транзакций</span>
          </div>
        ) : (
              Array.from(new Set(props.expenses.map((expense => moment(expense.createdAt).startOf('day').valueOf())))).map((oneDay, key) => {
                return <div key={oneDay}>
                  <div className="list-item__day">{moment(oneDay).lang("ru").format('LL')}</div>
                  {props.expenses.filter((expense) => moment(expense.createdAt).startOf('day').valueOf() === oneDay).map((expense) => {
                    return <ExpenseListItem key={expense.id} accountNamed={props.accounts.find((account) => account.id === expense.account).name} {...expense}/>;
                  })}
                  <div className="list-item__total">
                    {numeral(selectExpensesTotal(props.expenses.filter((expense) => moment(expense.createdAt).startOf('day').valueOf() === oneDay)) / 100).format('$0,0.00')}
                  </div>
                </div>
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
