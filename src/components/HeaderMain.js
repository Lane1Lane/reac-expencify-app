import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTypesFilter } from '../actions/filters';

export class HeaderMain extends React.Component {

    render() {
        return (
            <div className="main-header">
                <div className="content-container">
                    <div className="main-header2">
                        <div>
                            <Link className="mainHeaderButton" to="/dashboard"
                                onClick={() => {this.props.setTypesFilter([{label: 'Расход', value: -1}])}}
                            >Расходы</Link>
                            <Link className="mainHeaderButton" to="/dashboard"
                                onClick={() => {this.props.setTypesFilter([{label: 'Доход', value: 1}])}}
                            >Доходы</Link>
                            <Link className="mainHeaderButton" to="/accounts">Счета</Link>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

// const Header = ({ startLogout }) => (
//     <header className="header">
//     <div className="content-container">
//       <div className="header__content">
//         <Link className="header__title" to="/accounts">
//           <h1>Менеджер расходов</h1>
//         </Link>
//         <button className="button button--link button--out" onClick={startLogout}>Выйти</button>
//       </div>
//     </div>
//     </header>
//   );
  

  
  const mapDispatchToProps = (dispatch) => ({
    setTypesFilter: (type) => dispatch(setTypesFilter(type))
  });
  
  export default connect(undefined, mapDispatchToProps)(HeaderMain);