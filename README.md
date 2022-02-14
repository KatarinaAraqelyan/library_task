# Library REST API

### How to use it 

---
## Requirements

You will need install `Node.js`, `npm` and `PostgreSQL`  in your environment.
### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v13.12.0

    $ npm --version
    6.14.2

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### PostgreSQL
Install PostgreSQL [Guide](https://www.postgresql.org/download/)

## Project installation and usage

    $ git clone https://github.com/MASISKAR/todo-list-api
    $ cd todo-list-api
    $ npm install


## Running the project

    $ npm start:dev

## Making requests
### ``By default, the API_HOST is http://localhost:3000``

### ``Add a new user``
request url `API_HOST/users/add`

request method `POST`

request body
`{`
name: `{String}`, (required)
surname: `{String}`, (required)
email: `{String}`, (required)
`}`

responses

HTTP/ 201 Created
response body
`{`
"id": `id`,
"name": `name`,
"surname": `surname`,
"email": `example@gmail.com`,
"subscription": false,
"books_count": 0
`}`


or

HTTP/ 400 Bad Request 
response body
`{`
"statusCode": `400`,
"message": `User with email - example@gmail.com already exists`
`}`

### ``Delete user``
request url `API_HOST/users/delete/:id`

request method `DELETE`

request params
`{`
"id": `{number}`
`}`

responses

HTTP/ 200 OK
response body
`{`
"message": `Successfully deleted`,
"status_code": `200`
`}`

or

HTTP/ 400 Bad Request
response body
`{`
"statusCode": `400`,
"message": `You have books in your book list`,
`}`

or

HTTP/ 404 Not Found
response body
`{`
"statusCode": `404`,
"message": `"User is not found"`,
"error": `"Not Found"`
`}`

### ``Update User``

request url `API_HOST/users/update`

request method `PATCH`

request body
`{`
id: `{number}`, (required)
update_item: `{String}`, (required)
data: `{String}`, (required)
`}`

responses

HTTP/ 200 OK
response body
`{`
"id": `id`,
"name": `name or updated_data`,
"surname": `surname or updated_data`,
"email": `example@gmail.com`,
"subscription": false,
"books_count": 0
`}`

or

HTTP/ 404 Not Found
response body
`{`
"statusCode": `404`,
"message": `"User is not found"`,
"error": `"Not Found"`
`}`

or

HTTP/ 400 Bad Request
response body
{
"statusCode": `400`,
"message": `user doesn't have a field like update_item`
}

### ``User subscription``

request url `API_HOST/users/subscription/:id`

request method `PATCH`

request param
`{`
id: `{number}`, (required)
`}`

responses

HTTP/ 200 OK
response body
`{`
"id": `id`,
"name": `name or updated_data`,
"surname": `surname or updated_data`,
"email": `example@gmail.com`,
"subscription": true,
"books_count": 0
`}`

or

HTTP/ 400 Bad request
response body
{
"statusCode": 400,
"message": "you already have an active subscription"
}

### ``Get all users``

request url `API_HOST/users/`

request method `GET`

responses

HTTP/ 200 OK
response body
`[`
`{`
"id": `id`,
"name": `name `,
..
`}`,
`{`
"id": `id`,
"name": `name or updated_data`,
..
`}`,
..
`]`

### ``Get user by id``

request url `API_HOST/users/:id`

request method `GET`

request params
`{`
"id": `{number}`
`}`

responses

HTTP/ 404 Not Found
response body
`{`
"statusCode": `404`,
"message": `"User is not found"`,
"error": `"Not Found"`
`}`

or

HTTP/ 200 OK
response body
`[`
`{`
"id": `id`,
"name": `name`,
"surname": `surname`,
"email": `example@gmail.com`,
"subscription": false,
"books_count": 0,
"books": `[`
`{`
"id": `id`,
"name": `name`,
"author": `author`,
"description": `description`,
"userId": `userId`'
`}`,
...
`]`
`}`
`]`

### ``Add a new book``
request url `API_HOST/books/add`

request method `POST`

request body
`{`
name: `{String}`, (required)
author: `{String}`, (required)
description: `{String}`, (required)
`}`

responses

HTTP/ 201 Created
response body
`{`
"id": `id`,
"name": `name`,
"author": `author`,
"description": `description`,
"userId": `null`
`}`

or

HTTP/ 400 Bad Request
response body
`{`
"statusCode": `400`,
"message": `Book with name - name_example  already exists`
`}`

### ``Take book``
request url `API_HOST/books/take`

request method `PATCH`

request body
`{`
book_id: `{number}`, (required)
user_id: `{number}`, (required)
`}`

responses

HTTP/ 404 Not Found
response body
`{`
"statusCode": `404`,
"message": `"User is not found"`,
"error": `"Not Found"`
`}`

or

HTTP/ 400 Bad Request
response body
`{`
"statusCode": `400`,
"message": `the book is already taken`
`}`

or

HTTP/ 400 Bad Request
response body
`{`
"statusCode": `400`,
"message": `you have already taken 5 books`
`}`

or

HTTP/ 400 Bad Request
response body
`{`
"statusCode": `400`,
"message": `you do not have subscription`
`}`

or

HTTP/ 200 OK
response body
`{`
"id": `id`,
"name": `name`,
"author": `author`,
"description": `description`,
"userId": `user_id`
`}`

### ``return book``
request url `API_HOST/books/return`

request method `PATCH`

request body
`{`
book_id: `{number}`, (required)
user_id: `{number}`, (required)
`}`

responses

HTTP/ 404 Not Found
response body
`{`
"statusCode": `404`,
"message": `"User is not found"`,
"error": `"Not Found"`
`}`

or

HTTP/ 400 Bad Request
response body
`{`
"statusCode": `400`,
"message": `this book does not exist in your book list`
`}`

or

HTTP/ 200 OK
response body
`{`
"id": `id`,
"name": `name`,
"author": `author`,
"description": `description`,
"userId": `null`
`}`