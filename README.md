# Project Name

Project MERN 7 - Basic API Rest + Cloudinary

# Project Statement

This is a Node, Express, and MongoDB project and aims to create a server with two related data models.

## Installation

Run 'npm start' in the VSCode Terminal to have "Server listening on http://localhost:3001" and "connection to MongoDB".
The register password has at least 6 characters long, one lowercase and one uppercase.

An endpoint /auth/register allows registering a new user. The email cannot be repeated!
Register Password = no matter what password the user enters as long as "the password has at least 6 characters long, one lowercase and one uppercase".

## Usage

Type the URL http://localhost:3000/api/v1/games in your browser to arrive onto the "VideoGameStore" page.

## Features

The project presents in "Thunder Client" a collection of 3 folders:

1. Games
2. Platforms
3. Users

Both the Games and Platforms folders feature:
Game
POST Create Game: http://localhost:3000/api/v1/games
GET Get all Games: http://localhost:3000/api/v1/games
GET Get Game By ID: http://localhost:3000/api/v1/games/6607461998a8f4336c3e0ca4
PUT Update Game: http://localhost:3000/api/v1/games/66080a1a3cd4855e5639bb92
DEL Delete Game: http://localhost:3000/api/v1/games/6607e89a8b8e0c145aeac5e3

Platform
POST Create Platform: http://localhost:3000/api/v1/platforms
GET Get all Platform: http://localhost:3000/api/v1/platforms
GET Get Platform By ID: http://localhost:3000/api/v1/platforms/660758c5135d18405054a445
PUT Update Platform: http://localhost:3000/api/v1/platforms/660758c5135d18405054a445
DEL Delete Platform: http://localhost:3000/api/v1/platforms/660758c5135d18405054a445

A GET endpoint allows to retrieve an element from collection Game and
bring the data of the elements from collection Platform with which it is related.

A GET endpoint allows to retrieve an element from collection Platform and the
data of an element from collection Game with which it is related.

A PUT endpoint allows to add (or remove if it already exists) a new Platform id
element to the related element array of a document in collection Game.

A PUT endpoint allows to change or delete the field of a document in
collection Platform that points to an element of collection Game with which it is related.

Additionally the "Users" folder displays a Register and Login POST which is unique for each user:
POST Register http://localhost:3000/api/v1/users/register
POST Login http://localhost:3000/api/v1/users

Moreover the JWT has a validy of 1 hour.
The API is limited to 5' requests every 3 minutes.

When updating a document from the games, I am removing the attached image from Cloudinary!
The code functions are displayed in PUT under games and controller

## Plugin

| GitHub | https://github.com/samsondimitrijevic/finalProjectMern7.git

## Contact

samsondimitrijevic@gmail.com
