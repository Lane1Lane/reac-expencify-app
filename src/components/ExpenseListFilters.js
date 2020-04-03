import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, setAccountFilter, setCategoriesFilter, setTypesFilter } from '../actions/filters';
import 'react-dates/initialize';
import MultiSelect from "react-multi-select-component";



export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
    accounts: this.props.accounts.map((account) => {return {'label': account.name, 'value': account.id}}),
    loadFirst: true
  };
  
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };
  onAccountsChange = (e) => {
    let selectedAccounts = Array.from(e);
    this.props.setAccountFilter(selectedAccounts);
    
  }
  onCategoriesChange = (e) => {
    let selectedCategories = Array.from(e);
    this.props.setCategoriesFilter(selectedCategories);
  }
  onFiltersChange = (e) => {
    let selectedFilters = Array.from(e);
    this.props.setTypesFilter(selectedFilters);
  }
  render() {
    // if (this.props.filters.updateAccounts) {
    //   this.props.setAccountFilter(this.state.accounts);
    // }
    return (
      <div className="content-container">
        <div className="input-group-wide">
          <div className="input-group__item">
            <MultiSelect
                options={this.props.filters.expenseTypes.map((type) => ({'label': type.text, 'value': type.value}))}
                value={this.props.filters.types}
                onChange={this.onFiltersChange}
                hasSelectAll={false}
                disableSearch={true}
                overrideStrings={{"selectSomeItems": "Фильтр по типу транзакции...",
                "allItemsAreSelected": "Расходы и доходы",
                "search": "Поиск"}}
              />
            </div>
            <div className="input-group__item">
            <MultiSelect
              options={this.state.accounts.sort((a, b) => {
                return (b.label < a.label) ? 1 : -1;
              })}
              value={this.props.filters.accounts}
              onChange={this.onAccountsChange}
              // labelledBy={"Счёт"}
              overrideStrings={{"selectSomeItems": "Фильтр по счетам...",
              "allItemsAreSelected": "Выбраны все счета",
              "selectAll": "Выбрать/отменить все счета",
              "search": "Поиск"}}
            />
          </div>
          <div className="input-group__item">
            
            <MultiSelect
              options={this.props.categories.sort((a, b) => {
                return (b.label < a.label) ? 1 : -1;
              })}
              value={this.props.filters.categories}
              onChange={this.onCategoriesChange}
              // labelledBy={"Счёт"}
              overrideStrings={{"selectSomeItems": "Фильтр по категориям...",
              "allItemsAreSelected": "Выбраны все категории",
              "selectAll": "Выбрать/отменить все категории",
              "search": "Поиск"}}
            />
          </div>
        </div>
        <div className="input-group">
          <div className="input-group__item">
            <input
            className="text-input"
            placeholder="Поиск..."
            type="text"
            value={this.props.filters.text}
            onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDateId=''
              endDateId=''
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={true}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters,
  accounts: state.accounts,
  categories: state.categories
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  setAccountFilter: (accounts) => dispatch(setAccountFilter(accounts)),
  setCategoriesFilter: (categories) => dispatch(setCategoriesFilter(categories)),
  setTypesFilter: (types) => dispatch(setTypesFilter(types))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
