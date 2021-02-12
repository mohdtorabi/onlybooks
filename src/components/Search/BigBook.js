import './BigBook.scss';

export default function BigBook(props) {
  return (
    <div className="big-book-card">
      <div className="big-book-card-cover">
        <img
          className="big-book-card-cover-image"
          src={
            props.book.volumeInfo.imageLinks !== undefined
              ? props.book.volumeInfo.imageLinks.thumbnail
              : ''
          }
          alt={props.book.title}
        />
      </div>
      <div className="big-book-card-info">
        <h5 className="big-book-card-title">
          Title: {props.book.volumeInfo.title}
        </h5>
        <h5 className="big-book-card-pages">
          Pages: {props.book.volumeInfo.pageCount}
        </h5>
        <h5 className="big-book-card-published">
          Published: {props.book.volumeInfo.publishedDate}
        </h5>
        <h5 className="big-cbook-card-author">
          Author:{' '}
          {props.book.volumeInfo.authors
            ? props.book.volumeInfo.authors[0]
            : null}
        </h5>
        <h5 className="card-title">
          {props.book.volumeInfo.description
            ? props.book.volumeInfo.description
            : null}
        </h5>
      </div>
    </div>
  );
}
