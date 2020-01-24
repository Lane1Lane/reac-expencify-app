import React from 'react';
import { connect } from 'react-redux';

const AccountsList = (props) => (
    <div>
        AAA
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