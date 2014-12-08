CREATE DATABASE articles_app;

\c articles_app

CREATE TABLE articles (
        id serial primary key,
        title varchar(140),
        author varchar(40),
        content text
    );

INSERT INTO articles (title, author, content)
    VALUES ('What do dictators like to eat?', 'BBC', 'Dictators like to eat soup');

INSERT INTO articles (title, author, content)
    VALUES ('The Giver', 'Lois Lowry', 'super sad');