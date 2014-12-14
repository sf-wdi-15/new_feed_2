DROP DATABASE IF EXISTS articles;
CREATE DATABASE articles;

\c articles

CREATE TABLE articles (
        id serial primary key,
        title text,
        author text,
        content text
);