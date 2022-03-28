import React, { Component } from "react";
import { Redirect } from "react-router";
import "./App.css";
import { postServiceData } from "./util";
class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book_id: "NEW",
      book_title: "",
      book_authors: "",
      canGoBack: false,
    };

    this.loadBook = this.loadBook.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.handleChangeBookTitle = this.handleChangeBookTitle.bind(this);
    this.handleChangeBookAuthors = this.handleChangeBookAuthors.bind(this);

    // Populate state
    if (props.data.bookId !== undefined && props.data.bookId > 0) {
      this.loadBook();
    }
  }

  loadBook() {
    const params = { id: this.props.data.bookId };
    postServiceData("book", params).then((data) => {
      let book = data[0];
      this.setState({ book_id: book.book_id });
      this.setState({ book_title: book.book_title });
      this.setState({ book_authors: book.book_authors });
    });
  }

  saveBook(event) {
    event.preventDefault();
    var params = {
      book_id: this.state.book_id,
      book_title: this.state.book_title,
      book_authors: this.state.book_authors,
    };
    if (params.book_id === "NEW") {
      params.book_id = -1;
    }
    postServiceData("saveBook", params).then((data) => {
      this.setState({ canGoBack: true });
    });
  }

  handleChangeBookTitle(event) {
    this.setState({ book_title: event.target.value });
  }

  handleChangeBookAuthors(event) {
    this.setState({ book_authors: event.target.value });
  }

  render() {
    const token = this.props.getToken();
    if (!token) {
      return <Redirect push to="/" />;
    }
    if (this.state.canGoBack) {
      return <Redirect push to="/books" />;
    }
    return (
      <div className="App">
        <h1>Create / Edit Book page</h1>
        <form onSubmit={this.saveBook}>
          <table>
            <tbody>
              <tr>
                <th>book #</th>
                <td>{this.state.book_id}</td>
              </tr>
              <tr>
                <th>Title</th>
                <td>
                  <input
                    type="text"
                    size="60"
                    value={this.state.book_title}
                    onChange={this.handleChangeBookTitle}
                  />
                </td>
              </tr>
              <tr>
                <th>LastName</th>
                <td>
                  <input
                    type="text"
                    size="60"
                    value={this.state.book_authors}
                    onChange={this.handleChangeBookAuthors}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button type="submit" className="large">
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default Book;
