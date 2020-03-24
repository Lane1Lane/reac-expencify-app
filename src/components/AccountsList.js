import React from 'react';
import { connect } from 'react-redux';
import AccountsListItem from './AccountsListItem';

const AccountsList = (props) => (
    <div>
        <div className="list-body">
            {
            props.accounts.length === 0 ? (
                <div className="list-item list-item--mesaage">
                    <span>Нет Счетов</span>
                </div>
            ) : (
                props.accounts.map((account) => {
                    return <AccountsListItem key={account.id} {...account} />;
                })
                )
            }
        </div>
        {console.log(props.accounts)}
    </div>
);



const mapStateToProps = (state) => {
    return {
        accounts: state.accounts.sort((a, b) => {
            return (b.name < a.name) ? 1 : -1;
        })
    };
};
  
export default connect(mapStateToProps)(AccountsList);