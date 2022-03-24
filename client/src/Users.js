import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./App.css";
import UserInList from "./UserInList";
import { postServiceData } from "./util";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
    this.getUsers = this.getUsers.bind(this);
    this.getUsers();
    this.createUser = this.createUser.bind(this);
    this.switchBooks = this.switchBooks.bind(this);
  }

  getUsers() {
    const params = { ok: 1 };
    postServiceData("users", params).then((data) => {
      this.setState({ users: data });
      console.log(this.state.users);
    });
  }

  createUser(event) {
    event.preventDefault();
    this.setState({ canCreate: true });
  }

  switchBooks(event) {
    event.preventDefault();
    this.setState({ switchBooks: true });
  }

  render() {
    if (this.state.canCreate) {
      return <Navigate push to={"/user/NEW"} />;
    }
    if (this.state.switchBooks) {
      return <Navigate push to={"/books"} />;
    }
    /*  
    const token = this.props.getToken();

    if (!token) {
        return <Navigate to="/" />;
    }
    if (this.state.canCreate) {
        return <Redirect to={{
            pathname: "/user",
            state: {userId: -1}
        }} />;
    }
    */
    return (
      <div className="App">
        <table className="noborder">
          <tbody>
            <tr>
              <td className="noborder">
                <h1>List of users</h1>
              </td>
              <td className="noborder">
                {" "}
                <form onSubmit={this.switchBooks}>
                  <button>Switch books</button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="users-table">
          <thead>
            <tr>
              <th id="user-title">User #</th>
              <th id="firstname-title">First Name</th>
              <th id="lastname-title">Last name</th>
              <th id="birthdate-title">Birth Date</th>
              <th id="modification-title">Modification</th>
            </tr>
          </thead>

          <tbody>
            {this.state.users.map((user) => (
              <UserInList user={user} key={user.person_id} />
            ))}
          </tbody>

          <tfoot>
            <tr id="addNew">
              <td colSpan="4"></td>
              <td className="centered">
                <form>
                  <button onClick={this.createUser}>
                    <img src="img/plus.png" alt="add" className="icon" />
                  </button>
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
