import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { setAccountFilter, setTypesFilter } from '../actions/filters';

// numeral.register('locale', 'ukr', {
//     delimiters: {
//         thousands: ' ',
//         decimal: ','
//     },
//     abbreviations: {
//         thousand: 'тис.',
//         million: 'млн',
//         billion: 'млрд',
//         trillion: 'трил.'
//     },
//     ordinal : function (number) {
//         return number === 1 ? 'er' : 'ème';
//     },
//     currency: {
//         symbol: '₴'
//     }
// });

numeral.locale('ukr');

const AccountsListItem = ({ id, name, amount, ...props }) => (
    <Link className="list-item" to={`/dashboard`} onClick={() => {props.setAccountFilter([{'label': name, 'value': id}]); props.setTypesFilter([{label: 'Расход', value: -1}])}}>
        <div>
            <h3 className="list-item__title">{name}</h3>
        </div>
        <h3 className="list-item__data">{numeral(amount/100).format('$0,0.00')}</h3>     
    </Link>
);

const mapDispatchToProps = (dispatch) => ({
    setAccountFilter: (accounts) => dispatch(setAccountFilter(accounts)),
    setTypesFilter: (type) => dispatch(setTypesFilter(type))
})

export default connect(undefined, mapDispatchToProps)(AccountsListItem);

