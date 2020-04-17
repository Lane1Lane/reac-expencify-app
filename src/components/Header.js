import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { setTypesFilter } from '../actions/filters';

const Header = ({ startLogout, setTypesFilter, filters }) => (
  <header className="header">
  <div className="content-container">
    <div className="header__content">
      <Link className="header__title" to="/accounts">
        <h1>Менеджер расходов</h1>
      </Link>
      <button className="button button--link button--out" onClick={startLogout}>Выйти</button>
    </div>
  </div>
  <div className="main-header">
      <div className="content-container">
          <div className="main-header__content">
              <Link className={"main-Header_Button" + (filters.types.find((type) => type.value === -1) ? " main-Header_Button-active" : '')} to="/dashboard"
                  onClick={() => {setTypesFilter([{label: 'Расход', value: -1}])}}
              >РАСХОДЫ</Link>
              <Link className={"main-Header_Button" + (filters.types.find((type) => type.value === 1) ? " main-Header_Button-active" : '')} to="/dashboard"
                  onClick={() => {setTypesFilter([{label: 'Доход', value: 1}])}}
              >ДОХОДЫ</Link>
              <Link className={"main-Header_Button" + (filters.types.find((type) => type.value === 0) ? " main-Header_Button-active" : '')} to="/accounts"
                  onClick={() => {setTypesFilter([{label: 'Не выбрано', value: 0}])}}
              >СЧЕТА</Link>
          </div>
      </div>
  </div>
  </header>
);

    // <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
  setTypesFilter: (type) => dispatch(setTypesFilter(type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
