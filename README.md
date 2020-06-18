# Fancy Todo
`Fancy Todo Project Week 1. Simple web application of manage Your Todo List. This app has :`
> - Register
> - Login
> - Login with Google
> - Create Todo List
> - Delete Todo List
> - Edit Todo List
---
`environment variables: (.env)`
> - PORT=
> - SECRET=
> - CLIENT_ID=
---
`link deploy:`
> - _optional_
---
`Fancy Todo Guides:`
> - Log In - this button automatically guide you to our main page
> - Register - this button automatically store your user data to the application
> - Google Button - this button allows you to signing in using your google account
> - Log Out - this button allows you to log yourself out from the application.
> - Add Todo - this button for create your Todo
> - Edit - this button allow you to Edit Todo
> - Detail - this button will provide you Detail of your Todo
> - Done - this button will change status your Todo To Done
&nbsp;
# RESTful endpoints
## Global Responses
_Response (500 - Unknown error)_
> This endpoint should always return response below,
```
{ "message": "Interval Server Error" }
```
---
## POST /register
> Create a new user account
_Request Header_
```
  no need
```
_Request Body_
```
{ 
  urlImage: <link of image>,
  username: <username input>,
  email: <email input>,
  password: <password input>
}
```
_Response (201)_
```
{
    "id": <created id>,
    "email": <created email>,
    "username": <created username>,
    "urlImage": <created url Image>,
    "password": <hashed password>,
    "updatedAt": "2020-05-05T08:39:37.867Z",
    "createdAt": "2020-05-05T08:39:37.867Z"
}
```
_Response (400 - Bad Request)_
```
{ 
    "message": "Username may not be empty, email may not be empty"
}
```
---
## POST /login
> Login for User exist
_Request Header_
```
  no need
```
_Request Body_
```
{ 
  username: <username input> || email: <email input>,
  password: <email password>
}
```
_Response (200)_
```
{   
    "id": <listed id>
    "urlImage": <listed urlImage>
    "username": <listed username>
    "email": <listed email>
    "token": <created token>
}
```
_Response (400 - Bad request)_
```
{ 
    "message": "Invalid, check email or password"
}
```
---
## POST /google-signin
> Google sign in 
_Request Header_
```
  no need
```
_Request Body_
```
{
  id_token: <given id_token>
}
```
_Response (200)_
```
{   
    "id": <listed id>
    "urlImage": <listed urlImage>
    "email": <listed email>
    "token": <created token>
}
```
---
## GET /todos
> Show All Todo List
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Body_
```
  no need
```
_Response (200)_
```
[
  {
    "id": 6,
    "title": "dsads",
    "description": "fsafsaf",
    "status": "uncompleted",
    "due_date": "2020-06-06T00:00:00.000Z",
    "UserId": 10,
    "createdAt": "2020-06-13T08:32:40.126Z",
    "updatedAt": "2020-06-13T08:32:40.126Z"
  },
  {
    "id": 5,
    "title": "fsafs",
    "description": "fsafsaf",
    "status": "uncompleted",
    "due_date": "2020-06-27T00:00:00.000Z",
    "UserId": 10,
    "createdAt": "2020-06-13T08:28:47.664Z",
    "updatedAt": "2020-06-13T08:28:47.664Z"
  }
]
```
---
## POST /todos
> Create Todo List
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Body_
```
{
    "title": "fsafs",
    "description": "fsafsaf",
    "due_date": "2020-06-27T00:00:00.000Z",
}
```
_Response (201)_
```
{
  "id": 6,
  "title": "dsads",
  "description": "fsafsaf",
  "status": "uncompleted",
  "due_date": "2020-06-06T00:00:00.000Z",
  "UserId": 10,
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}

```
---
## DELETE /todos/:id
> Delete Todo List
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
{
    "id": <id todo>
}
```
_Response (200)_
```
{
  "id": 6,
  "title": "dsads",
  "description": "fsafsaf",
  "status": "uncompleted",
  "due_date": "2020-06-06T00:00:00.000Z",
  "UserId": 10,
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}

```
---
## GET /todos/:id
> Get data from selected id
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
{
    "id":<id token>
}
```
_Response (200)_
```
{
  "id": 6,
  "title": "dsads",
  "description": "fsafsaf",
  "status": "uncompleted",
  "due_date": "2020-06-06T00:00:00.000Z",
  "UserId": 10,
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}

```
---
## PUT /todos/:id
> To submit Form Edit Todos
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
{
    "id":<id token>
}
```
_Request Body_
```
{
    "title": "fsafs",
    "description": "fsafsaf",
    "due_date": "2020-06-27T00:00:00.000Z",
}
```
_Response (200)_
```
{
  "id": 6,
  "title": "dsads",
  "description": "fsafsaf",
  "status": "uncompleted",
  "due_date": "2020-06-06T00:00:00.000Z",
  "UserId": 10,
  "createdAt": "2020-06-13T08:32:40.126Z",
  "updatedAt": "2020-06-13T08:32:40.126Z"
}

```
---
## PUT /todos/:id/done
> To submit Form Edit Todos
_Request Header_
```
{
    "access_token": <token>
}
```
_Request Params_
```
{
    "id":<id token>
}
```
_Request Body_
```
no Need
```
_Response (200)_
```
{
  message: "data id 9 has been done"
}

```
