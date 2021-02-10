import './Book.scss';
import SearchBook from './SearchBook';

export default function Book(props) {
  return (
    <div className="book-card">
      <div className="book-card-cover">
        <img
          className="book-card-cover-image"
          src={
            props.book.volumeInfo.imageLinks !== undefined
              ? props.book.volumeInfo.imageLinks.thumbnail
              : ''
          }
          alt={props.book.title}
        />
      </div>
      <div className="book-card-info">
        <h5 className="book-card-title">
          Title: {props.book.volumeInfo.title}
        </h5>
        <h5 className="book-card-pages">
          Pages: {props.book.volumeInfo.pageCount}
        </h5>
        <h5 className="book-card-published">
          Published: {props.book.volumeInfo.publishedDate}
        </h5>
        <h5 className="cbook-card-author">
          Author:{' '}
          {props.book.volumeInfo.authors
            ? props.book.volumeInfo.authors[0]
            : null}
        </h5>
        {/* <h5 className="card-title">
                    {book.volumeInfo.description
                      ? book.volumeInfo.description
                      : null}
                  </h5> */}
      </div>
    </div>
  );
}
