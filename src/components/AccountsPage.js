import React from 'react';
import AddAccount from './AddAccount';
import AccountsList from './AccountsList';



const AccountsPage = () => (
    <div className="page-header">
        <div className="content-container">
            <AddAccount />
            <AccountsList />
        </div>
        
    </div>
)

export default AccountsPage;