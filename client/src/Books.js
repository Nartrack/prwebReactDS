import React, { Component } from "react";
import { Redirect } from "react-router";
import "./App.css";
import BookInList from "./BookInList";
import { postServiceData } from "./util";

class Books extends Component {
  constructor(props) {
    super(props);

    this.state = { books: [], canCreate: false, switchUsers: false };
    this.getBooks = this.getBooks.bind(this);
    this.createBook = this.createBook.bind(this);
    this.switchUsers = this.switchUsers.bind(this);
    this.getBooks();
  }

  getBooks() {
    const params = { ok: 1 };
    postServiceData("books", params).then((data) => {
      this.setState({ books: data });
    });
  }

  createBook(event) {
    event.preventDefault();
    this.setState({ canCreate: true });
  }

  switchUsers(event) {
    event.preventDefault();
    this.setState({ switchUsers: true });
  }

  render() {
    const token = this.props.getToken();
    if (!token) {
      console.log("missing token");
      return <Redirect push to="/" />;
    }
    if (this.state.canCreate) {
      return (
        <Redirect
          to={{
            pathname: "/book",
            state: { bookId: -1 },
          }}
        />
      );
    }
    if (this.state.switchUsers) {
      return <Redirect to="/users" />;
    }
    return (
      <div className="App">
        <table className="noborder">
          <tbody>
            <tr>
              <td className="noborder">
                <h1>List of books</h1>
              </td>
              <td className="noborder">
                <form onSubmit={this.switchUsers}>
                  <button>Switch users</button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="list">
          <thead>
            <tr>
              <th>book #</th>
              <th>Title</th>
              <th>Authors</th>
              <th>Available</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {this.state.books.map((book) => (
              <BookInList book={book} key={book.book_id} />
            ))}
          </tbody>

          <tfoot>
            <tr id="addNew">
              <td colSpan="3"></td>
              <td className="centered">
                <form onSubmit={this.createBook}>
                  <button>
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

export default Books;
