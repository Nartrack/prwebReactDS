import React, { Component } from 'react';
import './App.css';
import { Navigate } from 'react-router-dom';
import BookInList from './BookInList';
import { postServiceData } from './util';

class Books extends Component {
    constructor(props){
        super(props);

        this.state = {books: [], canCreate: false, switchUsers:false};
		this.getBooks = this.getBooks.bind(this);
		this.createBook = this.createBook.bind(this);
		this.switchUsers = this.switchUsers.bind(this);
        this.getBooks() ;
    }

    getBooks() {
		const params = {ok:1};
		postServiceData("books", params).then((data) => {
            this.setState({books: data});
		});
    }

    createBook(event) {
		event.preventDefault();
    	this.setState({canCreate: true});
    }

    switchUsers(event) {
		event.preventDefault();
    	this.setState({switchUsers: true});
    }

    render() {
        if (this.state.canCreate){
            return <Navigate push to={"/book/NEW"}/>;
        }
        if (this.state.switchUsers) {
            return <Navigate push to="/users" />;
        }
    return (
        <div className="App">
            <table className="noborder">
                <tbody>
                    <tr>
                        <td className="noborder"><h1>List of books</h1></td>
                        <td className="noborder"><form onSubmit={this.switchUsers}><button>Switch users</button></form></td>
                    </tr>
                </tbody>
            </table>

            <table className="books-table">
                <thead>
                    <tr>
                        <th id="book-title">Book #</th>
                        <th id="booktitle-title">Title</th>
                        <th id="author-title">Author</th>
                        <th id="modification-title">Modification</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.books.map((book) => <BookInList book={book} key={book.book_id} /> )}
                </tbody>

                <tfoot>
                    <tr id="addNew">
                        <td colSpan="4"></td>
                        <td className="centered">
                            <form>
                                <button onClick={this.createBook}><img src="img/plus.png" alt="add" className="icon"/></button>
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