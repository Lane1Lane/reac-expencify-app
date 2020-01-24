import React from 'react';
import { connect } from 'react-redux';
import { startAddAccount } from '../actions/accounts';
import AccountForm from './AccountForm';

class AddAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            viewAddButton: true
        }
    }
    onAddAccount = () => {
        this.setState(() => ({viewAddButton: false}));
    }
    onSubmit = (account) => {
        this.props.startAddAccount(account);
        this.setState(() => ({viewAddButton: true}));
    }
    render() {
        return (
            
            <div >
                {this.state.viewAddButton ? <button className="button" onClick={this.onAddAccount}>Добавить счет</button> : <AccountForm onSubmit={this.onSubmit}/>}
            </div>
        )
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddAccount: (account) => dispatch(startAddAccount(account))
  });

export default connect(undefined, mapDispatchToProps)(AddAccount);