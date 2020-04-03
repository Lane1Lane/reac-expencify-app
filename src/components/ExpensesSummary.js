import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00'); 
    return (
        <div className="page-footer">
            <div className="content-container">
                {/* {expensesCount ? <h1 className="page-footer__title">Всего расходов: <span>{expensesCount}</span>, на сумму: <span>{formattedExpensesTotal}</span></h1> : ''} */}
                <div className="page-footer__actions">
                    <Link className="button" to="/create">Добавить расходы</Link>
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

export default connect(mapStateToProps)(ExpensesSummary);