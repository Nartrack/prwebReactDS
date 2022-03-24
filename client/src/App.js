import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Users from './Users';
import User from './User';
import Books from './Books';
import Book from './Book';
import './App.css';

function setToken(userToken) {
	sessionStorage.setItem('token', JSON.stringify(userToken));
}
  
function getToken() {
	const tokenString = sessionStorage.getItem('token');
	const userToken = JSON.parse(tokenString);
	return (userToken != null)
}

function removeToken() {
	sessionStorage.removeItem('token');
}

class App extends Component {
	render() {
		return (
    		<Router>
    			<Switch>
            		<Route exact path='/'
						render={(props) => (
							<Login setToken={setToken} removeToken={removeToken} />
						)}
					/>
            		<Route path='/users'
						render={(props) => (
							<Users getToken={getToken} />
						 )}
					/>
            		<Route path='/user'
						render={(props) => (
							<User getToken={getToken} data={props.location.state} />
						 )}
					/>
            		<Route path='/books'
						render={(props) => (
							<Books getToken={getToken} />
						 )}
					/>
            		<Route path='/book'
						render={(props) => (
							<Book getToken={getToken} data={props.location.state} />
						 )}
					/>
        		</Switch>
    		</Router>
    	);
  }
}

export default App;

