import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
<<<<<<< HEAD
import numeral from 'numeral';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>
      {numeral(amount / 100).format('$0,0.00')}
      -
      {moment(createdAt).format('MMMM Do, YYYY')}
    </p>
  </div>
=======
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
>>>>>>> 8f8fc0161606f6e991f81b7a93ae2f770e904089
);

export default ExpenseListItem;
