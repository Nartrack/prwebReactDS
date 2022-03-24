import React, { Component } from 'react';
import { postServiceData } from './util';
import './App.css';

class BorrowInList extends Component {
    constructor(props){
        super(props);
        this.state = {borrow_id: this.props.borrow.borrow_id, borrow_return: this.props.borrow.borrow_return};

		this.returnBook = this.returnBook.bind(this);
    }
    
    returnBook(event) {
        event.preventDefault();
		let theDate = new Date().toISOString().slice(0, 10);
        var params = {borrow_id: this.props.borrow.borrow_id, borrow_return: theDate};
        postServiceData("returnBook", params).then((data) => {
            this.setState({borrow_return: theDate});
        });
    }

    render() {
        let theBorrowDate = new Date(this.props.borrow.borrow_date).toISOString().slice(0, 10);
        if ((this.state.borrow_return === null) 
            || (this.state.borrow_return === undefined) 
            || (this.state.borrow_return === "")) {
            return (
            <tr>
                <td>{theBorrowDate}</td>
                <td>{this.props.borrow.book_title}</td>
                <td >
                    <form>
                        <button onClick={this.returnBook}>
                            <img src="img/return.png" alt="edit" className="icon" />
                        </button>
                    </form>
                </td>
            </tr>
            );
        } else {
            let theBorrowReturn = new Date(this.state.borrow_return).toISOString().slice(0, 10);
            return (
			<tr>
				<td>{theBorrowDate}</td>
				<td>{this.props.borrow.book_title}</td>
				<td>{theBorrowReturn}</td>
			</tr>
		);
        }
    }
}

export default BorrowInList;