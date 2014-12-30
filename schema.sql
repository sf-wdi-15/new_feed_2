-- DROP DATABASE IF EXISTS articles_app;
CREATE DATABASE articles_app;

\c articles_app

CREATE TABLE articles (
	id serial primary key,
	title text,
	author text,
	content text
);

ALTER TABLE articles ADD COLUMN fiction boolean;