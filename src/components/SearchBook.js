import { useState } from 'react';
import './SearchBook.scss';

import axios from 'axios';
export default function SearchBook() {
  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    'AIzaSyDYqoOuixHYPK519JfGcBH7h90uwKa7OMY'
  );

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        'https://www.googleapis.com/books/v1/volumes?q=' +
          book +
          '&key=' +
          apiKey +
          '&maxResults=40'
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="card-header main-search">
        <input
          onChange={handleChange}
          className="AutoFocus form-control"
          placeholder="Type book name..."
          type="text"
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-primary search-btn"
        />
      </div>
      <div className="container">
        {result.map((book) => (
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
              <h5 className="card-title">{book.volumeInfo.title}</h5>
            </p>
          </div>
        ))}
      </div>
    </form>
  );
}
