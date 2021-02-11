-- Users seed insertion
INSERT INTO users (id, first_name, last_name, email, password, is_admin) VALUES ( '1', 'Ash', 'Pokemon', 'a@a.com', '12345', false)
INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES ('Pikachu', 'Pokemon', 'p@a.com', '12345', false)
INSERT INTO users (first_name, last_name, email, password, is_admin) VALUES ('Charizard', 'Pokemon', 'c@a.com', '12345', false)

-- book seed insertion
INSERT INTO book (book_name, author, pages, genre, description, image_url, ISBN) VALUES ('Pokemon Crystal', 'Elizabeth M. Hollinger', '144', 'fun', 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'http://books.google.com/books/content?id=t7rK9URZ-IMC&printsec=frontcover&img=1&zoom=1&source=gbs_api', '9780439154048');
INSERT INTO book (book_name, author, pages, genre, description, image_url, ISBN) VALUES ('Pokemon Collectors value Guide', 'Checker Bee Publishing', '270', 'fun', 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'http://books.google.com/books/content?id=t7rK9URZ-IMC&printsec=frontcover&img=1&zoom=1&source=gbs_api', '9780439154048');
INSERT INTO book (book_name, author, pages, genre, description, image_url, ISBN) VALUES ('Pokemon Mystery Dungeon', 'Prima Games', '239', 'fun', 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', 'http://books.google.com/books/content?id=t7rK9URZ-IMC&printsec=frontcover&img=1&zoom=1&source=gbs_api', '9780439154048');

-- Book_club seed insertion
INSERT INTO book_club (club_name, owner_id, image_url, private) VALUES ('onlyPokemon','1', 'https://clipartart.com/images/ash-and-pikachu-clipart-1.png', false);

-- session seed insertion
INSERT INTO session (book_club_id, book_id) VALUES ('1', '1');
