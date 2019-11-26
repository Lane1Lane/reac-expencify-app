import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00'); 
    return (
        <div>
            {expensesCount ? <p>Viewing {expensesCount} expense totalling {formattedExpensesTotal}</p> : ''}
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