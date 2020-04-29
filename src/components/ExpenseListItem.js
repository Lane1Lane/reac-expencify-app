import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
moment.locale('ru');
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

const ExpenseListItem = ({ accountNamed, namedCategory, description, amount, createdAt, id }) => (
    <Link name={id} className="list-item" to={`/edit/${id}`}>
        <div>
            <p className="list-item__sub-title list-item__green-data">{accountNamed}</p>
            <h3 className="list-item__title">{description}</h3>
            
            <span className="list-item__sub-title">{namedCategory}</span>
        </div>

        <h3 className={"list-item__data" + ((amount > 0) ? ' list-item__green-data' : '')}>{numeral(amount/100).format('0,0.00 $')}</h3>     
    </Link>
);

export default ExpenseListItem;
