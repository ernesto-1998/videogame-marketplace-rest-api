# Videogame Marketplace REST API

## Description

This is a rest api that works as the backend of a Videogame Marketplace, it has every module ready to create a user, a user profile, store products (These are divided between Consoles, Videogames and Periferis), in order to create a user, you need to provide a user_role_id, which currently are just two types 1=admin and 2=client. In fact you have a very detailed description of the entities on src/v1/db/backupt (In fact, everything related to the main postgres database is inside here, includind static files), there you will find all the information of the postgres database.

Every entitie has CRUD functionality, USER, PROFILE, ADDRESS, CONSOLES, VIDEOGAMES, PERIFERICS, but every entitie aside from USER needs you to be logged in order to interact with them, this functionality is achivied with sessions, especifically with express-sessions and a mongoDB store, this means that every time you log in on the app, you will receive a cookie called user_sid, with that cookie in your header request you will have access to the resources available for your user role.

## Technologies used:

1. Node js
1. Express js
1. Postgresql
1. MongoDB
1. express-session
1. express-validator
1. Bcrypt

## How to deploy

First you have to set data bases running before running the rest api. On /docker-dev you'll find a __*docker-compose.yml*__ file, you only have to run __docker compose up -d__ (You have to run it on /docker-dev directory in order to catch the .env file) and that will deploy postgresql service and mongodb service, it will also persist data on both folders __"/docker-dev/mongo/data"__ and __"/docker-dev/postgres/data"__. After those services are running, you are to ready to run __*"npm run start"*__ on source folder.

## Endpoints

This README file is not intented to be a documentation of the api, so i will give a brief explanation of the api endpoints:

### User

body example: 
```json
{
    "email": "something@email.com",
    "password": 12345
}
```
1. POST __/api/v1/user/signup__ ---> Here you can create a user
1. POST __/api/v1/user/login__ ----> Login endpoint
1. GET __/api/v1/user/logout__ ----> Close session endpoint
1. GET __/api/v1/user/user-role__ ----> Here you can get all the user roles available (you'll need it to create a user)
1. GET __/api/v1/user/user-all__ ----> Here you can get all the registered users

### Profile

These entities are pretty attached to user, in fact you need to have an active user to use these endpoints

body example: 
```json
    {
	"name": "John",
	"lastname": "Doe",
	"date_birth": "2000/01/01",
	"profile_pic": "https://c4.wallpaperflare.com/wallpaper/369/1019/754/mazda3-tcr-2019-vehicle-black-cars-mazda-3-reflection-hd-wallpaper-preview.jpg",
	"contact_email": "something@gmail.com",
	"contact_number": "71548968"
}
```
1. GET __/api/v1/profile__ ---> Get the profile of the active user
1. POST __/api/v1/profile__ ---> Create a profile
1. PATCH __/api/v1/profile__ ---> Modify a profile
1. DELETE __/api/v1/profile__ ---> Delete a profile

### Address
body example:
```json
{
	"country": "El Salvador",
	"state": "San Salvador",
	"street": "San Salvador",
	"zip_code": "022010"
}
```
These entities are pretty attached to user, in fact you need to have an active user to use these endpoints

1. GET __/api/v1/address__ ---> Get all the addresses of the active user
1. GET __/api/v1/address/:id__ ---> Get one address of the active user
1. POST __/api/v1/address__ ---> Create an address
1. PATCH __/api/v1/address__ ---> Modify an address
1. DELETE __/api/v1/profile__ ---> Delete all the address of the active user
1. DELETE __/api/v1/profile/:id__ ---> Delete one address of the active user

### Console, Periferic and Videogame

__Console__ body example:
```json
{
	"name": "The Legend of Zelda Tears of the Kingdom",
	"console_dict_id": 22,
	"is_used": false,
	"is_sold": false,
	"price": 250.10,
	"image": "https://media.es.wired.com/photos/645d4a69a566376ee967bb98/16:9/w_1600,c_limit/Zelda-Tears-Of-The-Kingdom-Culture-TotK_3rd_54.jpg",
	"description": "The newest game of the zelda series, with a really amazing gameplay and a story that will keep you at the edge of your bed",
	"genders": [1,2,3]
}
```

__Periferic__ and __Videogame__ body example:
```json
{
	"console_dict_id": 5,
	"is_used": false,
	"is_sold": false,
	"price": 400.10,
	"image": "https://i.blogs.es/885597/ps5apfinal/1366_2000.jpg",
	"description": "A new playstation 5 that has 0 time of use, with a low price of $400.10"
}
```
These endpoints are pretty similar, in fact all are the same, it just change the entity name on the url

1. GET __/api/v1/(entity_name)/all__ ---> Here you retrieve all the registered items of the entity
1. GET __/api/v1/(entity_name)__ ---> Here you retrieve all the registered items of the active user
1. GET __/api/v1/(entity_name)/:id__ ---> Here you retrieve a registered items by entity_id (It only works if the item belongs to the active user)
1. POST __/api/v1/(entity_name)__ ---> Here you create a register of the entity
1. PATCH __/api/v1/(entity_name)__ ---> Here you modify an entity of the active user
1. DELETE __/api/v1/(entity_name)__ ---> Here you delete all the registered entities of the active user 
1. DELETE __/api/v1/(entity_name)/:id__ ---> Here you delete a entity of the active user 



## Environment variables

As you may notice, .env files are include on the project, thats because this project it is intended to be a practice project, so i let them be on the repository for everyone to deploy easily the rest api. Here you have a breaf description of the environment variables that this project use:

1. SERVER_PORT=

### These are for the database of the app, in this case we are using postgresql

1. PGHOST=
1. PGPORT=
1. PGUSER=
1. PGPASSWORD=
1. PGDATABASE="db_videogame_marketplace"

### This is info about the express session

1. SESSION_NAME=
1. SESSION_SECRET=

### These are for the database of the session, in this case we are using mongodb

1. SESSION_DB_HOST=
1. SESSION_DB_PORT=
1. SESSION_DB_DATABASE=
1. SESSION_DB_COLLECTION=
1. SESSION_DB_USER=
1. SESSION_DB_PASSWORD=
