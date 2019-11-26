import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
moment.locale('uk');
import numeral from 'numeral';

numeral.register('locale', 'ukr', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'тис.',
        million: 'млн',
        billion: 'млрд',
        trillion: 'трил.'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '₴'
    }
});

// switch between locales
numeral.locale('ukr');

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>Amount: {numeral(amount/100).format('$0,0.00')}</p>
        <p>Created at: {moment(createdAt).format('LL')}</p>
    </div>
);

export default ExpenseListItem;
