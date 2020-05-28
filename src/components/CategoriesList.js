import React from 'react';
import { connect } from 'react-redux';
import CategoriesListItem from './CategoriesListItem';
import { setTypesFilter } from '../actions/filters';

function CategoriesList(props) {
    props.setTypesFilter([{label: 'Настройки', value: 2}]);
    return (
        <div>
            <div className="list-body">
                {
                props.categories.length === 0 ? (
                    <div className="list-item list-item--mesaage">
                        <span>Нет категорий</span>
                    </div>
                ) : (
                    props.categories.map((category) => {
                        return <CategoriesListItem key={category.value} {...category} />;
                    })
                    )
                }
            </div>
        </div>
    );
} 





const mapStateToProps = (state) => {
    return {
        categories: state.categories.sort((a, b) => {
            return (b.label < a.label) ? 1 : -1;
        })
    };
};

const mapDispatchToProps = (dispatch) => ({
    setTypesFilter: (type) => dispatch(setTypesFilter(type))
  });
  
export default connect(mapStateToProps,mapDispatchToProps)(CategoriesList);