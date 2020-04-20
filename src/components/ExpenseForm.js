import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import { connect } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { startAddCategory } from '../actions/categories';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenseType: props.expense ? props.expense.expenseType : -1,
      category: props.expense ? props.expense.category ? props.expense.category.split(',') : [] : [],
      account: props.expense ? props.expense.account : props.accounts[0].id,
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.expenseType * props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: '',
      accounts: props.accounts
    };
  }
  onExpenseTypeChange = (e) => {
    const expenseType = +e.target.value;
    this.setState(() => ({ expenseType, 'category': [] }));
  }
  onCreateCategory = (newCategory) => {
    
    let newCat = {'label': newCategory, 'type': this.state.expenseType}
    this.props.addCategory(newCat).then((key) => {
      const category = this.state.category;
      category.push(key);
      this.setState(() => ({ category }))
    });
  }
  onCategoryChange = (e,action) => {
    let category = [];
    if (e) { category = e.map((cat) => cat.value)};
    this.setState(() => ({ category }));
  }
  onAccountChange = (e) => {
    const account = e.target.value;
    this.setState(() => ({ account }));
  }
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount || !this.state.account) {
      this.setState(() => ({ error: 'Обязательные поля: счет, описание, сумма' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        expenseType: this.state.expenseType,
        category: this.state.category.join(),
        account: this.state.account,
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100 * this.state.expenseType,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    console.log(this.state.createdAt);
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <select
          className="text-input"
          value={this.state.expenseType}
          onChange={this.onExpenseTypeChange}
        > {this.props.expenseTypes.map((expenseType, ikey) => 
          <option 
            value={expenseType.value}
            key={ikey}
          >
            {expenseType.text}
          </option>)}
        </select>
        <select
          className="text-input"
          value={this.state.account}
          onChange={this.onAccountChange}
        >
          {this.state.accounts.map((account) => <option 
              value={account.id} 
              key={account.id}
            >
                {account.name}
            </option>)}
        </select>
        <CreatableSelect
          classNamePrefix="text-input"
          options={this.props.categories.filter((category) => category.type === this.state.expenseType)}
          value={this.state.category.map((cat) => ({'value' : cat, 'label': this.props.categories.find(catName => catName.value === cat).label}))}
          onCreateOption={this.onCreateCategory}
          onChange={this.onCategoryChange}
          isMulti
          noOptionsMessage={() => "Категории не созданы"}
          formatCreateLabel={() => "Создать новую категорию"}
          placeholder="Категория"
        />
        <input
          type="text"
          placeholder="Описание"
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Сумма"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="Заметки"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        >
        </textarea>
        <div>
          <button className="button">Сохранить</button>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCategory: (category) => dispatch(startAddCategory(category))
});

const mapStateToProps = (state) => {
  return {
      accounts: state.accounts.sort((a, b) => {
          return (b.name < a.name) ? 1 : -1;
      }),
      categories: state.categories.sort((a, b) => {
        return (b.name < a.name) ? 1 : -1;
      }),
      expenseTypes: state.filters.expenseTypes
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);