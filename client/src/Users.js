import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { postServiceData } from './util';
import UserInList from './UserInList';
import './App.css';

class Users extends Component {
	constructor(props) {
		super(props);

		this.state = {users: [], canCreate: false, switchBooks: false};
		this.getUsers = this.getUsers.bind(this);
		this.createUser = this.createUser.bind(this);
		this.switchBooks = this.switchBooks.bind(this);
        this.getUsers() ;
    }

    getUsers() {
		const params = {ok:1};
		postServiceData("users", params).then((data) => {
            this.setState({users: data});
		});
    }

    createUser(event) {
		event.preventDefault();
    	this.setState({canCreate: true});
    }

    switchBooks(event) {
		event.preventDefault();
    	this.setState({switchBooks: true});
    }

    render() {
    const token = this.props.getToken();
    if (!token) {
        return <Redirect push to="/" />;
    }
    if (this.state.canCreate) {
        return <Redirect to={{
            pathname: "/user",
            state: {userId: -1}
        }} />;
    }
    if (this.state.switchBooks) {
        return <Redirect to="/books" />;
    }
    return (
      <div className="App">
        <table className="noborder">
        	<tbody>
            <tr>
                <td className="noborder"><h1>List of users</h1></td>
                <td className="noborder"><form onSubmit={this.switchBooks}><button>Switch books</button></form></td>
            </tr>
        	</tbody>
        </table>

        <table className="list">
        	<thead>
            <tr>
                <th >user #</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th >Birthdate</th>
                <th ></th>
            </tr>
        	</thead>
        	
        	<tbody>
                {this.state.users.map((user) => <UserInList user={user} key={user.person_id} /> )}
        	</tbody>

        	<tfoot>
            <tr id="addNew">
                <td colSpan="4"></td>
                <td  className="centered">
                    <form onSubmit={this.createUser}>
                        <button><img src="img/plus.png" alt="add" className="icon" /></button>
                    </form>
                </td>
            </tr>
        	</tfoot>
        </table>
      </div>
    );
  }
}

export default Users;

