import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, setAccountFilter } from '../actions/filters';
import 'react-dates/initialize';
import MultiSelect from "react-multi-select-component";



export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
    accounts: this.props.accounts.map((account) => {return {'label': account.name, 'value': account.id}}),
    selectedAccounts: this.props.accounts.map((account) => {return {'label': account.name, 'value': account.id}}),
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
    this.setState(() => ({ selectedAccounts }))
    this.props.setAccountFilter(selectedAccounts.map((account) => account.value));
  }
  render() {
    if (this.state.loadFirst) {
      this.props.setAccountFilter(this.state.accounts.map((account) => account.value));
      this.state.loadFirst = false;
    }
    return (
      <div className="content-container">
        <div className="input-group-wide">
          <div className="input-group__item">
            <MultiSelect
              options={this.state.accounts}
              value={this.state.selectedAccounts}
              onChange={this.onAccountsChange}
              labelledBy={"Счёт"}
              overrideStrings={{"selectSomeItems": "Выбрать счета...",
              "allItemsAreSelected": "Выбраны все счета",
              "selectAll": "Выбрать все счета",
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
  accounts: state.accounts
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByAmount: () => dispatch(sortByAmount()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  setAccountFilter: (accounts) => dispatch(setAccountFilter(accounts))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
