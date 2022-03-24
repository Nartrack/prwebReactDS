import React, { Component } from 'react';
import { postServiceData } from './util';
import BorrowInList from './BorrowInList';
import './App.css';

class Borrows extends Component {
    constructor(props){
        super(props);

        this.state={borrows: [], books: [], book_id: -1};
        this.getBooks = this.getBooks.bind(this);
		this.getBorrows = this.getBorrows.bind(this);
		this.handleChangeBook = this.handleChangeBook.bind(this);
		this.borrowBook = this.borrowBook.bind(this);

		this.getBooks();
		this.getBorrows();
    }

    getBooks(){
        const params = {ok:1};
		postServiceData("books", params).then((data) => {
            this.setState({books: data});
		});
    }

    getBorrows(){
        const params = {person_id: this.props.person_id};
		postServiceData("borrows", params).then((data) => {
            this.setState({borrows: data});
        });
    }
    
    handleChangeBook(event) {
		this.setState({book_id: event.target.value});
	}

	borrowBook(event) {
		event.preventDefault();
		let theDate = new Date().toISOString().slice(0, 10);
		const params = {person_id: this.props.person_id, book_id: this.state.book_id, borrow_date: theDate};
		postServiceData("saveBorrow", params).then((data) => {
			this.setState({borrows: data});
		});
	}

	render() {
		return (
		<div className="App">
			<table className="noborder">
				<tbody>
					<tr>
						<td className="noborder"><h2>Borrow list:</h2></td>
						<td className="noborder"></td>
					</tr>
				</tbody>
			</table>
		
			<table className="list">
				<thead>
					<tr>
						<th>Date</th>
						<th>Title</th>
						<th>Return</th>
					</tr>
				</thead>
		
				<tbody>
					{this.state.borrows.map((borrow) => 
						<BorrowInList borrow={borrow} key={borrow.borrow_id} />)}
				</tbody>
		
				<tfoot>
					<tr id="addNew">
						<td colSpan="2">
							<select onChange={this.handleChangeBook}>
								<option value="-1"> - </option>
								{this.state.books.map((book) =>
									<option value={book.book_id} key={book.book_id}>{book.book_title}</option>
								)}
							</select>
						</td>
						<td className="centered">
							<form onSubmit={this.borrowBook}>
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

export default Borrows;