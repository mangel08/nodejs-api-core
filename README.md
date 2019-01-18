# API REST with Nodejs ES6

## Get Started with build a API with the skeleton of this project

## Libraries an dependencies most important of this project
[Express](https://expressjs.com/es/)
[Mongoose](https://mongoosejs.com/)
[jwt-simple](https://www.npmjs.com/package/jwt-simple)
[babel](https://babeljs.io/)
[dotenv](https://www.npmjs.com/package/dotenv)

---

# SETUP

## 1) Install dependencies

```bash
npm install
```

### 2) Create in the root the .env file and paste this code:

```js
PORT=YOUR_PORT
DB_HOST='mongodb://localhost:YOUR_PORT/YOUR_DATABASE'
SECRET_TOKEN=YOUR_SECRET_KEY
DEFAULT_ROL=YOUR_ID_OF_ROLE_DEFAULT_IN_MONGO_DB
```

## Run Local
```bash
npm run start-dev
```

## Run Production
```bash
npm start
```

## Testing
### Authentication
1. Use the endpoint in Postman http://localhost:YOUR_PORT/api/v1/auth/register (METHOD POST)

Example:
```js
{
	"email": "youremail@gmail.com",
	"password": "123456",
	"person": {
		"firstName": "John",
		"lastName": "Doe",
		"gender": "M",
		"phone": "5555555"
	}
}
```

2. Use the endpoint in Postman http://localhost:YOUR_PORT/api/v1/auth/login (METHOD POST)

Example:
```js
{
	"email": "youremail@gmail.com",
	"password": "123456"
}
```

### Users
1. getUsers METHOD GET http://localhost:YOUR_PORT/api/v1/users
2. getUser METHOD GET http://localhost:YOUR_PORT/api/v1/user/:userId
3. getUserPerson METHOD GET http://localhost:3000/api/v1/user/5c42480c83ce48452b22a83e/person
3. getUserPersons METHOD GET http://localhost:3000/api/v1/users/person

3. updateUser METHOD PUT http://localhost:YOUR_PORT/api/v1/user/:userId
```js
{
	"username": "newemail@gmail.com",
}
```

4. deleteUser METHOD DELETE http://localhost:YOUR_PORT/api/v1/user/:userId

### Persons
1. getPersons METHOD GET http://localhost:YOUR_PORT/api/v1/persons
2. getPerson METHOD GET http://localhost:YOUR_PORT/api/v1/person/:personId

3. updatePerson METHOD PUT http://localhost:YOUR_PORT/api/v1/person/:personId
```js
{
	"fisrtname": "New Name",
}
```

4. deletePerson METHOD DELETE http://localhost:YOUR_PORT/api/v1/person/:personId

