import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
import { setShowFilters } from '../actions/filters';


const ExpensesSummary = ({ expensesCount, expensesTotal, setShowFilters }) => {
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('0,0.00 $'); 
    return (
        <div className="page-footer">
            <div className="content-container">
                {expensesCount ? <h1 className="page-footer__total">Всего операций: <span>{expensesCount}</span>, на сумму: <span>{formattedExpensesTotal}</span></h1> : ''}
            </div>
            <div className="content-container container-flex">
                <div className="page-footer__actions">
                    <Link className="button" to="/create">Добавить</Link>
                </div>
                <div className="page-footer__actions">
                    <button className="button" onClick={setShowFilters}>Фильтры</button>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    const visibleExpense = selectExpenses(state.expenses, state.filters);
    return {
        expensesCount: visibleExpense.length,
        expensesTotal: selectExpensesTotal(visibleExpense)
    };
};

const mapDispatchToProps = (dispatch) => ({
    setShowFilters: () => dispatch(setShowFilters())
  });

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesSummary);