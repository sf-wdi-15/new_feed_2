CREATE DATABASE articles_app;

\c articles_app

CREATE TABLE articles (
    id serial primary key,
    title varchar(255),
    author varchar(255),
    content text
  );

ALTER TABLE articles ADD COLUMN fiction boolean;