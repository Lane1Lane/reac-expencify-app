import React from 'react';
import { connect } from 'react-redux';
import { startLogin, createUser, signInWithEmail, resetPassword } from '../actions/auth';
import { Link } from 'react-router-dom';

export class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          email: '',
          password: '',
          password2: '',
          registration: false,
          error: ''
        }
    }
    onDataChange = (e) => {
        this.updateError;
        const { name , value } = e.target;
        this.setState(() => ({ [name] : value }));
    }
    newRegistration = () => {
        this.updateError;
        const registration = !this.state.registration
        this.setState(() => ({ registration }))
    }
    createUser = () => {
        this.updateError;
        const { email, password } = this.state;
        if (this.state.password === this.state.password2) {
            this.props.createUser(email, password).catch(function(error) {
                let errorMessage = (error.code === 'auth/weak-password') ? 'Пароль должен состоять минимум из 6 символов' :
                (error.code === 'auth/email-already-in-use') ? 'Данный email уже зарегистрирован в системе' : error.message;
                this.updateError(errorMessage);
              }.bind(this));
        } else {
            this.updateError('Пароли не совпадают')
        }
        
    }
    signInWithEmail = () => {
        this.updateError;
        const { email, password } = this.state;
        this.props.signInWithEmail(email, password).catch(function(error) {
            let errorMessage = (error.code === 'auth/user-not-found') ? 'Пользователя с данным email не найдено' :
                (error.code === 'auth/wrong-password') ? 'Не правильный пароль' : error.message;
            this.updateError(errorMessage);
          }.bind(this));
    }
    updateError = (error = '') => {
        this.setState(() => ({ error }));    
    }
    resetPassword = () => {
        this.props.resetPassword(this.state.email).then(function() {
            this.updateError(`Письмо отправлено на почту ${this.state.email}`);  
        }.bind(this));
         
    }

    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box">
                    <h1 className="box-layout__title">Менеджер расходов</h1>
                    <p>Ведение расходов и доходов по всем счетам</p>
                    <label
                        htmlFor="email"
                    >
                        Логин (email)
                    </label>
                    <input 
                        type="text" 
                        className="box-layout__pass"
                        name="email"
                        autoFocus
                        value={this.state.email}
                        onChange={this.onDataChange}
                    />
                    <label
                        htmlFor="password"
                    >
                        {this.state.registration ? 'Введите новый пароль' : 'Пароль'}
                    </label>
                    <input 
                        type="password" 
                        className="box-layout__pass"
                        name="password"
                        value={this.state.password}
                        onChange={this.onDataChange}
                    />
                    <label
                        htmlFor="password"
                        className={(!this.state.registration ? "hidden" : '')}
                    >
                        Введите пароль ещё раз
                    </label>
                    <input 
                        type="password" 
                        className={"box-layout__pass" + (!this.state.registration ? " hidden" : '')} 
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onDataChange}
                    />
                    <p className="box-layout__error">{this.state.error ? this.state.error : ''}</p>
                    <p className="box-layout__error reset-password" onClick={this.resetPassword}>{this.state.error === 'Не правильный пароль' ? 'Запросить сброс пароля?' : ''}</p>
                    <div className={"box-layout__box-buttons" + (this.state.registration ? " hidden" : '')}>
                        <button className="button" onClick={this.signInWithEmail} >Войти</button>
                        <button className="button" onClick={this.newRegistration}>Регистрация</button>
                    </div>
                    <div className={"box-layout__box-buttons" + (!this.state.registration ? " hidden" : '')}>
                        <button className="button" onClick={this.createUser}>Создать</button>
                        <button className="button" onClick={this.newRegistration}>Отмена</button>
                    </div>
                    <button className="button" onClick={this.props.startLogin}>Войти с Google</button>
                </div>
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin()),
    createUser: (email, password) => dispatch(createUser(email, password)),
    signInWithEmail: (email, password) => dispatch(signInWithEmail(email, password)),
    resetPassword: (email) => dispatch(resetPassword(email))
})

export default connect(undefined, mapDispatchToProps)(LoginPage);