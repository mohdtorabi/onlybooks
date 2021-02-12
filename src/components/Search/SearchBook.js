import { useState } from 'react';
import axios from 'axios';

import './SearchBook.scss';
import Book from './Book';
import BigBook from './BigBook';
import SessionForm from './SessionForm';

export default function SearchBook(props) {
  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);
  const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

  function handleChange(event) {
    event.preventDefault();
    const book = event.target.value;
    setBook(book);
    axios
      .get(
        'https://www.googleapis.com/books/v1/volumes?printType=books&q=' +
          book +
          '&key=' +
          apiKey +
          '&maxResults=20'
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      })
      .catch(() => {
        console.log('Book Search Error');
      });
  }

  return (
    <>
      {!props.state.book ? (
        <div className="book-card-search">
          <div>
            <h1>Search for a book...</h1>
            <input
              onChange={handleChange}
              className="AutoFocus form-control"
              placeholder="Search for a book..."
              type="text"
            />
          </div>
          <div className="book-card-container">
            {book
              ? result.map((book, i) => (
                  <Book
                    key={i}
                    state={props.state}
                    setState={props.setState}
                    book={book}
                  ></Book>
                ))
              : null}
          </div>
        </div>
      ) : (
        <>
          <BigBook
            state={props.state}
            setState={props.setState}
            book={props.state.book}
          ></BigBook>
          <SessionForm></SessionForm>
        </>
      )}
    </>
  );
}
