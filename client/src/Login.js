import React, { Component } from 'react';
import './App.css';
import { Navigate } from 'react-router-dom';
import { postServiceData } from './util';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canLogin: false, 
            login:"", 
            pass:""};

        this.checkLogin = this.checkLogin.bind(this);

        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
    }

    handleChangeLogin(event){
        this.setState({login: event.target.value});
    }

    handleChangePass(event){
        this.setState({pass: event.target.value});
    }

    checkLogin(event){
        event.preventDefault();
        const params = {login: this.state.login, passwd: this.state.pass};
		postServiceData("identify", params).then((data) => {
			if (data.ok === 1) {
				this.props.setToken("abcd");
				this.setState({canLogin: true});
			}
        });
    }

    checkLoginOld(event) {
		event.preventDefault();
		if ((this.state.login === "admin") && (this.state.pass === "admin")) {
			this.props.setToken("abcd");
			this.setState({canLogin: true});
		}
	}

    render() {
        if(this.state.canLogin){
            return (<Navigate to="/users" />);
        }
        this.props.removeToken();
        return (
            <div className="App">
            <form className="login" onSubmit={this.checkLogin}>
                <h1>Library Login</h1>
                <p> <input type="text" value={this.state.login} onChange={this.handleChangeLogin} placerholder="login"/> </p>
                <p> <input type="password" value={this.state.pass} onChange={this.handleChangePass} placerholder="pass"/> </p>
                <p> <button type="submit" className="large">Login</button></p>
            </form>
            </div>
        );
    }
}

export default Login;
