import React from 'react';
import AddAccount from './AddAccount';
import AccountsList from './AccountsList';
import HeaderMain from './HeaderMain'



const AccountsPage = () => (
    <div>
        <div>
        <HeaderMain/>
        </div>
        <div className="page-header">
            <div className="content-container">
                <AddAccount />
                <AccountsList />
            </div>
            
        </div>
    </div>
    
)

export default AccountsPage;