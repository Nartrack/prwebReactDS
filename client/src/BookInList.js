import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { postServiceData } from './util';
import './App.css';

class BookInList extends Component {
	constructor(props) {
		super(props);

		this.state = {canEdit: false, canGoBack: false};
		this.editBook = this.editBook.bind(this);
		this.deleteBook = this.deleteBook.bind(this);
    }

    editBook(event) {
		event.preventDefault();
    	this.setState({canEdit: true});
    }

    deleteBook(event) {
        event.preventDefault();
        var params = {book_id: this.props.book.book_id};
        postServiceData("deleteBook", params).then((data) => {
            this.setState({canGoBack: true});
        });
    }
        

    render() {
        let book = this.props.book;
		if (this.state.canEdit) {
			return <Redirect push to={{
                pathname: "/book",
                state: {bookId: book.book_id}
            }} />;
		}
        if (this.state.canGoBack) {
            return <Redirect push to="/books" />;
        }
        return (
			<tr>
				<td>{book.book_id}</td>
				<td>{book.book_title}</td>
				<td>{book.book_authors}</td>
				<td >
                    <form>
                        <button onClick={this.editBook}><img src="img/edit.png" alt="edit" className="icon" /></button>
                        <button onClick={this.deleteBook}><img src="img/delete.png" alt="edit" className="icon" /></button>
                    </form>
                </td>
			</tr>
		);
    }
}

export default BookInList;

