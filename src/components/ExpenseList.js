import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import { setLastExpenseId } from '../actions/expenses';
import numeral from 'numeral';
import moment from 'moment';
moment.locale('ru');
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'





export class ExpenseList extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    if (this.props.filters.lastExpenseId) {
      scroller.scrollTo(this.props.filters.lastExpenseId, {
        duration: 1000,
        delay: 100,
        smooth: "easeInOutQuart",
        offset: -90
      });
      this.props.setLastExpenseId('');
    };
  }
  render() {
    return <div className="content-container">
    <div className="list-body">
      {
        
        this.props.expenses.length === 0 ? (
          <div className="list-item list-item--mesaage">
            <span>Нет транзакций</span>
          </div>
        ) : (
              Array.from(new Set(this.props.expenses.map((expense => moment(expense.createdAt).startOf('day').valueOf())))).map((oneDay, key) => {
                return <div key={oneDay}>
                  <div className="list-item__day">{moment(oneDay).lang("ru").format('LL')}</div>
                  {this.props.expenses.filter((expense) => moment(expense.createdAt).startOf('day').valueOf() === oneDay).map((expense) => {
                    let namedCategory = []
                    if (expense.category.length) {expense.category.split(',').forEach((category)=>{
                      if (this.props.categories.find((cat) => cat.value === category)) {namedCategory.push(this.props.categories.find((cat) => cat.value === category).label)} else {namedCategory.push('"Категория удалена"')};
                    })} else {namedCategory.push('...')};
                    return <ExpenseListItem key={expense.id} accountNamed={this.props.accounts.find((account) => account.id === expense.account).name} namedCategory = {namedCategory.join(', ')} {...expense}/>;
                  })}
                  {(this.props.expenses.filter((expense) => moment(expense.createdAt).startOf('day').valueOf() === oneDay).length > 1) ?
                    (<div className="list-item__total">
                      {numeral(selectExpensesTotal(this.props.expenses.filter((expense) => moment(expense.createdAt).startOf('day').valueOf() === oneDay)) / 100).format('0,0.00 $')}
                    </div>) : ''
                  }
                  
                </div>
              })
            
          )
      }
    </div>
  </div>}
};

const mapDispatchToProps = (dispatch) => ({
  setLastExpenseId: (lastExpenseId) => dispatch(setLastExpenseId(lastExpenseId))
});

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
    accounts: state.accounts,
    filters: state.filters,
    categories: state.categories
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
