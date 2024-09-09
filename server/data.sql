-- First create a database then create the table in that by using below query

CREATE DATABASE booksapp;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT UNIQUE NOT NULL,
  summary TEXT UNIQUE NOT NULL,
  book_publish_year VARCHAR(10) NOT NULL
);