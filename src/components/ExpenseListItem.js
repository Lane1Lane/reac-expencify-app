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
    <Link className="list-item" to={`/edit/${id}`} onClick={() => {console.log('test')}}>
        <div>
            <h3 className="list-item__title">{description}</h3>
            <span className="list-item__sub-title">{moment(createdAt).format('LL')}</span>
        </div>
        <h3 className="list-item__data">{numeral(amount/100).format('$0,0.00')}</h3>     
    </Link>
);

export default ExpenseListItem;
