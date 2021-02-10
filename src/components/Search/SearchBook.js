import { useState } from 'react';
import axios from 'axios';

import './SearchBook.scss';
import Book from './Book';
export default function SearchBook() {
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
    <form className="book-card-search">
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
        {book ? result.map((book) => <Book book={book}></Book>) : null}
      </div>
    </form>
  );
}
