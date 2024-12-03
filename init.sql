-- Create Table Users
CREATE TABLE users (
id SERIAL PRIMARY KEY NOT NULL, 
name TEXT NOT NULL,
email TEXT NOT NULL,
password TEXT NOT NULL,
created_at TIMESTAMP DEFAULT current_timestamp
);

-- Create Table Posts
CREATE TABLE posts (
id SERIAL PRIMARY KEY NOT NULL, 
content TEXT NOT NULL,
title TEXT NOT NULL,
imgsrc TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP,
user_id INTEGER NOT NULL references users(id) ON DELETE CASCADE
);

-- Create Table Comments
CREATE TABLE comments (
id SERIAL PRIMARY KEY, 
content TEXT NOT NULL,
created_at TIMESTAMP DEFAULT current_timestamp,
user_id INTEGER NOT NULL references users(id) ON DELETE CASCADE,
post_id INTEGER NOT NULL references posts(id) ON DELETE CASCADE,
username TEXT NOT NULL
);