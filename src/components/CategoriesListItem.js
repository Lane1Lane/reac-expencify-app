import React from 'react';
import { connect } from 'react-redux';
import { startEditCategory , startRemoveCategory } from '../actions/categories';

class CategoriesListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editCategory: false,
            label: ''
        }
    }
    onEditCategory = () => {
        this.setState(()=>({editCategory: !this.state.editCategory, label: this.props.label}))
    }
    onLabelChange = (e) => {
        const label = e.target.value;
        this.setState(()=>({ label }));
    }
    onSaveCategory = () => {
        this.props.startEditCategory(this.props.value,{label: this.state.label});
        this.setState(()=>({editCategory: false}));
    }
    onRemoveCategory = () => {
        this.props.startRemoveCategory(this.props.value);
    }
    render() {
        return (
            <div>
                {this.state.editCategory? (
                    <div className="list-item-category pointer" onClick={this.onEditCategory}>
                        <input 
                            type='text'
                            placeholder='Название категории'
                            autoFocus
                            className="text-input"
                            value={this.state.label}
                            onChange={this.onLabelChange}
                        />
                        <div className='list-item-category__buttons'>
                            <button className="button" onClick={this.onSaveCategory}>Сохранить</button>
                            <button className="button" onClick={this.onRemoveCategory}>Удалить</button>
                        </div>
                    </div>
                    
                ) : (
                    <div className="list-item-category pointer" onClick={this.onEditCategory}>
                        <div>
                            <h3 className="list-item__title category">{this.props.label}</h3>
                        </div> 
                    </div>
                )}
            </div> 
        )}
}


const mapDispatchToProps = (dispatch) => ({
    startEditCategory: (id, label) => dispatch(startEditCategory(id, label)),
    startRemoveCategory: (id) => dispatch(startRemoveCategory(id))
})

export default connect(undefined, mapDispatchToProps)(CategoriesListItem);

