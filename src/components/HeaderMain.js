import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTypesFilter } from '../actions/filters';
import { hideFilters,  } from '../actions/filters';

const HeaderMain = ({ hideFilters, setTypesFilter, filters } ) => (
    <div className="main-header">
        <div className="content-container">
            <div className="main-header__content">
                <Link className={"main-Header_Button" + (filters.types.find((type) => type.value === -1) ? " main-Header_Button-active" : '')} to="/dashboard"
                    onClick={() => {hideFilters(); setTypesFilter([{label: 'Расход', value: -1}])}}
                >РАСХОДЫ</Link>
                <Link className={"main-Header_Button" + (filters.types.find((type) => type.value === 1) ? " main-Header_Button-active" : '')} to="/dashboard"
                    onClick={() => {hideFilters(); setTypesFilter([{label: 'Доход', value: 1}])}}
                >ДОХОДЫ</Link>
                <Link className={"main-Header_Button" + (filters.types.find((type) => type.value === 0) ? " main-Header_Button-active" : '')} to="/accounts"
                    onClick={() => {hideFilters(); setTypesFilter([{label: 'Не выбрано', value: 0}])}}
                >СЧЕТА</Link>
            </div>
        </div>
    </div>
);

    // <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  };
};

const mapDispatchToProps = (dispatch) => ({
  setTypesFilter: (type) => dispatch(setTypesFilter(type)),
  hideFilters: () => dispatch(hideFilters())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMain);
