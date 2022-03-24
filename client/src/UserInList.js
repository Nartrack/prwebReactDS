import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { postServiceData } from './util';
import './App.css';

class UserInList extends Component {
	constructor(props) {
		super(props);
        
        this.state = {canEdit: false, canGoBack: false};
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    editUser(event) {
		event.preventDefault();
    	this.setState({canEdit: true});
    }

    deleteUser(event) {
        event.preventDefault();
        var params = {person_id: this.props.user.person_id};
        postServiceData("deleteUser", params).then((data) => {
            this.setState({canGoBack: true});
        });
    }

    render() {
        let user = this.props.user;
        if (this.state.canEdit){
            return <Navigate push to={"/user/"+user.person_id}/>;
        }
        if (this.state.canGoBack){
            return <Navigate push to={"/users/"}/>;
        }
        return (
			<tr>
				<td>{user.person_id}</td>
				<td>{user.person_firstname}</td>
				<td>{user.person_lastname}</td>
				<td>{(new Date(user.person_birthdate)).toLocaleDateString()}</td>
				<td >
                    <form>
                        <button onClick={this.editUser}><img src="img/edit.png" alt="edit" className="icon" /></button>
                        <button onClick={this.deleteUser}><img src="img/delete.png" alt="edit" className="icon" /></button>
                    </form>
                </td>
			</tr>
		);
    }
}

export default UserInList;

