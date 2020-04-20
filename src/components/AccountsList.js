import React from 'react';
import { connect } from 'react-redux';
import AccountsListItem from './AccountsListItem';
import { setTypesFilter } from '../actions/filters';

function AccountsList(props) {
    props.setTypesFilter([{label: 'Не выбрано', value: 0}]);
    return (
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
        </div>
    );
} 





const mapStateToProps = (state) => {
    return {
        accounts: state.accounts.sort((a, b) => {
            return (b.name < a.name) ? 1 : -1;
        })
    };
};

const mapDispatchToProps = (dispatch) => ({
    setTypesFilter: (type) => dispatch(setTypesFilter(type))
  });
  
export default connect(mapStateToProps,mapDispatchToProps)(AccountsList);