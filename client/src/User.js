import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { postServiceData } from './util';
import Borrows from './Borrows';
import './App.css';

class User extends Component {
	constructor(props) {
		super(props);

        let theDate = new Date().toISOString().slice(0, 10);
		this.state = {person_id: "NEW", person_lastname: "", person_firstname: "", person_birthdate: theDate, canGoBack: false};

        this.loadUser = this.loadUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
		this.handleChangePersonFirstname = this.handleChangePersonFirstname.bind(this);
		this.handleChangePersonLastname = this.handleChangePersonLastname.bind(this);
		this.handleChangePersonBirthDate = this.handleChangePersonBirthDate.bind(this);

        // Populate state
        if ((props.data.userId  !== undefined) && (props.data.userId  > 0)) {
            this.loadUser() ;
        }
    }

    loadUser() {
        const params = { id: this.props.data.userId };
        postServiceData("user", params).then((data) => {
            let user = data[0];
            let theDate = new Date(user.person_birthdate).toISOString().slice(0, 10);
            this.setState({person_id: user.person_id});
            this.setState({person_lastname: user.person_lastname});
            this.setState({person_firstname: user.person_firstname});
            this.setState({person_birthdate: theDate});
        });
    }

    saveUser(event) {
		event.preventDefault();
		var params = {person_id: this.state.person_id, 
                        person_lastname: this.state.person_lastname,
                        person_firstname: this.state.person_firstname,
                        person_birthdate: this.state.person_birthdate};
        if (params.person_id === "NEW") {
            params.person_id = -1;
        }
		postServiceData("saveUser", params).then((data) => {
    		this.setState({canGoBack: true});
		});
    }

	handleChangePersonFirstname(event) {
		this.setState({person_firstname: event.target.value});
	}

	handleChangePersonLastname(event) {
		this.setState({person_lastname: event.target.value});
	}

	handleChangePersonBirthDate(event) {
		this.setState({person_birthdate: event.target.value});
	}


    render() {
    const token = this.props.getToken();
    if (!token) {
        return <Redirect push to="/" />;
    }
    if (this.state.canGoBack) {
        return <Redirect push to="/users" />;
    }
    return (
      <div className="App">
        <h1>Create / Edit User page</h1>
        <form onSubmit={this.saveUser}>
            <table>
                <tbody>
                <tr>
                    <th>user #</th>
                    <td>{this.state.person_id}</td>
                </tr>
                <tr>
                    <th>FirstName</th>
                    <td><input type="text" size="60" 
                     value={this.state.person_firstname} onChange={this.handleChangePersonFirstname}/></td>
                </tr>
                <tr>
                    <th>LastName</th>
                    <td><input type="text" size="60" 
                     value={this.state.person_lastname} onChange={this.handleChangePersonLastname}/></td>
                </tr>
                <tr>
                    <th>Birthdate</th>
                    <td><input type="date"
                               value={this.state.person_birthdate} onChange={this.handleChangePersonBirthDate}/></td>
                </tr>
                <tr>
                    <td colSpan="2"><button type="submit" className="large">Save</button></td>
                </tr>
                </tbody>
            </table>
        </form>
        <Borrows person_id={this.props.data.userId}/>
      </div>
    );
  }
}

export default User;

