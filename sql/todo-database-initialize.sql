CREATE DATABASE todo DEFAULT CHARACTER SET utf8mb4;

USE todo;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  password varchar(30) NOT NULL,
  PRIMARY KEY (id),
  INDEX username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
   id int NOT NULL AUTO_INCREMENT,
   userId int NOT NULL,
   description varchar(500) NOT NULL,
   creationDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
   deadline date NOT NULL,
   complete tinyint DEFAULT 0,
   PRIMARY KEY (id),
   INDEX userId (userId),
   FOREIGN KEY (userId) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

