DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS book CASCADE;
DROP TABLE IF EXISTS book_club CASCADE;
DROP TABLE IF EXISTS club_users CASCADE;
DROP TABLE IF EXISTS read CASCADE;
DROP TABLE IF EXISTS session CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS book_club_readers CASCADE;



CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  image_url VARCHAR(255),
)



CREATE TABLE book (
  id SERIAL PRIMARY KEY NOT NULL,
  book_name VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  pages INT NOT NULL,
  genre VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  ISBN VARCHAR(255) NOT NULL,
);


CREATE TABLE book_club (
  id SERIAL PRIMARY KEY NOT NULL,
  book_id VARCHAR(255) NOT NULL,
  club_name VARCHAR(255) NOT NULL,
  users VARCHAR(255) NOT NULL,
  private BOOLEAN NOT NULL DEFAULT FALSE,
  image_url VARCHAR(255)
);

CREATE TABLE club_users (
  id SERIAL PRIMARY KEY NOT NULL,
  book_club_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT fk_book_club
    FOREIGN KEY(book_club_id) 
	  REFERENCES book_club(id),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);

CREATE TABLE read (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  CONSTRAINT fk_book
    FOREIGN KEY(book_id) 
	  REFERENCES book(id),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
	  REFERENCES users(id),
  page_number INT,
  finished BOOLEAN NOT NULL DEFAULT FALSE,
  rating INT,
  review VARCHAR(255),
);

CREATE TABLE session (
  id SERIAL PRIMARY KEY NOT NULL,
  book_club_id INT NOT NULL,
  book_id INT NOT NULL,
  CONSTRAINT fk_book_club
    FOREIGN KEY(book_club_id) 
	  REFERENCES book_club(id),
  CONSTRAINT fk_book
    FOREIGN KEY(book_id) 
	  REFERENCES book(id),
  start_date DATE,
  end_date DATE,
  created_at DATE,
  updated_at DATE
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NOT NULL,
  session_id INT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
	  REFERENCES users(id),
  CONSTRAINT fk_session
    FOREIGN KEY(session_id) 
	  REFERENCES session(id),
  messages VARCHAR(255) NOT NULL,
  page_number INT NOT NULL,
  spoilers BOOLEAN NOT NULL DEFAULT FALSE,
  created_at,
);

CREATE TABLE book_club_readers (
  id SERIAL PRIMARY KEY NOT NULL,
  book_club_id INT NOT NULL,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
 CONSTRAINT fk_book_club
    FOREIGN KEY(book_club_id) 
	  REFERENCES book_club(id),
 CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
	  REFERENCES users(id),
 CONSTRAINT fk_book
    FOREIGN KEY(book_id) 
	  REFERENCES book(id),
);