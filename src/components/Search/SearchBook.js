import { useState } from 'react';
import './SearchBook.scss';

import axios from 'axios';
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
          '&maxResults=10'
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
    <form>
      <div className="card-header main-search">
        <input
          onChange={handleChange}
          className="AutoFocus form-control"
          placeholder="Search for a book..."
          type="text"
        />
      </div>
      <div className="container">
        {book
          ? result.map((book) => (
              <div className="book-card">
                <img
                  src={
                    book.volumeInfo.imageLinks !== undefined
                      ? book.volumeInfo.imageLinks.thumbnail
                      : ''
                  }
                  alt={book.title}
                />
                <p>
                  <h5 className="card-title">Title: {book.volumeInfo.title}</h5>
                  <h5 className="card-title">
                    Pages: {book.volumeInfo.pageCount}
                  </h5>
                  <h5 className="card-title">
                    Published: {book.volumeInfo.publishedDate}
                  </h5>
                  <h5 className="card-title">
                    Author:{' '}
                    {book.volumeInfo.authors
                      ? book.volumeInfo.authors[0]
                      : null}
                  </h5>
                  {/* <h5 className="card-title">
                    {book.volumeInfo.description
                      ? book.volumeInfo.description
                      : null}
                  </h5> */}
                </p>
              </div>
            ))
          : null}
      </div>
    </form>
  );
}
