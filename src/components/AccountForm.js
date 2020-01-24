import React from 'react';

export default class AccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            amount: ''
        }
    };
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }))
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit({
            name: this.state.name,
            amount: parseFloat(this.state.amount, 10) * 100
          });
    };
    render() {
        return (
            <form className='form' onSubmit={this.onSubmit}>
                <input 
                    type='text'
                    placeholder='Название счета'
                    autoFocus
                    className="text-input"
                    value={this.state.name}
                    onChange={this.onNameChange}
                />
                <input
                    type="text"
                    placeholder='Начальная сумма счета'
                    className="text-input"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                />
                <div>
                    <button className="button">Сохранить счет</button>
                </div>
            </form>
        )
    };
};