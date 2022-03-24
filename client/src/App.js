import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Users from './Users';
import User from './User';
import Books from './Books';
import Book from './Book';
import Borrows from './Borrows'
import './App.css';

function setToken(userToken){
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken(){
  const tokenString = sessionStorage.getItem('item');
  const userToken = JSON.parse(tokenString);
  return (userToken != null);
}

function removeToken(){
  sessionStorage.removeItem('token');
}
class App extends Component {
  render() {
    return (
      <Routes>
        <Route 
          exact 
          path='/'
          element={<Login setToken={setToken} removeToken={removeToken}/>}/>
        <Route 
          path='/users' 
          element={<Users getToken={getToken}/>}/>
        <Route 
          path='/user/:userId'
          element={<User getToken={getToken}/>}/>
          <Route 
          path='/books' 
          element={<Books getToken={getToken}/>}/>
          <Route 
          path='/book/:bookId' 
          element={<Book getToken={getToken}/>}/>
          <Route 
          path='/borrows' 
          element={<Borrows getToken={getToken}/>}/>
      </Routes>
    );
  }
}

export default App;
