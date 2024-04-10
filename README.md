# RESTful API with Node.js, Express, and Postgres

A Node.js app with PostgreSQL database deployed on heroku.

As part of the project SE3, this app was implemented to update our highscores in the game online instead of locally.

The highscore list can be found [here](https://ashepherdstale.herokuapp.com/highscore).

And associated [github repo](https://github.com/dolisa2000/ashepherdstale_backend) (Only as contributor).

# MVC Pattern

## Model

Handles interaction with database, returns data to controller.

```javascript
// get all players
Highscore.get = async(tablename) => {
    const results = await db
    .query(`SELECT player_name, score, play_time, TO_CHAR(created_at, 'DD.MM.YY') AS date FROM ${db.escapeIdentifier(tablename)} ORDER BY score DESC LIMIT 10;`);
    return results.rows;
}
```

## Controller (API routes and endpoints)

Controllers import a model and then processes the returned data.
Controllers are the callback functions we are passing to the router methods.

```javascript
// get all players in a highscore table --> rendered as a view
getHighscoreTable(req, res, next) {
  Highscore.get(tablename)
    .then(data => res.render('index', { data }))
    .catch(err => next(new BadSyntaxError(err)));
}
```

## Views

Views render the data from the controller (In this example the highscore list).
Find view in:

```
src > views
```

## Routes

"Routes" to forward the supported requests.

```javascript
// get highscoretable
router.get('/highscore', new HighscoreOneController().getHighscoreTable);
```

Router functions are Express middleware, which means that they must either complete (respond to) the request or call the next function in the chain. In the case above we complete the request using send().

# In which environment will the app run?

![Heroku](https://user-images.githubusercontent.com/69717707/126058577-c4039fec-791b-433c-9c01-14edb1e3ebf1.png)


## Development mode
The server side Express code will be served by a node server using Nodemon which helps in automatically restarting the server whenever server side code changes.
Furthermore queries can be run and tested locally.

## Production mode
In production mode, the app will connect to heroku PostgreSQL database.

# Installation

```
git clone https://github.com/dolisa2000/se3project_backend.git
npm install
```

## Create Tables (localhost)

If you want to create the tables from the database folder:

```
cd .\database\
```

Connect to your database:

```
sudo -u postgres psql mydb
```

Run:

```
\i init.sql
``` 

Else you can just write your own sql files or create tables and run queries via terminal.

For PSQL refer to: https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546

## Testing and running queries via REST (localhost)

To run and test queries locally, a postgresql server should be set up.

Downloads and a documentation to postgresql can be found here: https://www.postgresql.org/

After downloading postgres and setting up a server the queries should be adjusted, so you can run queries on your own tables.

## Configuring environment variables (localhost)

To test the queries on localhost, environment variables should be set up in a .env file.
The file should be on the root of the project. 

The file should look like this (take the variables you used for setting up the postgres server/database):

```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=password
DB_DATABASE=database
DB_PORT=3000
NODE_ENV=development
```

To read more about environment variables refer to: https://bit.ly/3wC81ic

# Deploy on Heroku 

To deploy it on heroku I followed several tutorials

https://www.taniarascia.com/node-express-postgresql-heroku/

https://stackabuse.com/adding-a-postgresql-database-to-a-node-js-app-on-heroku/

https://dev.to/glrta/deploy-postgresql-in-node-js-to-heroku-for-beginners-1ck0

## Heroku Nodejs Postgres Cheat Sheet

https://cheatography.com/bligoubloups/cheat-sheets/heroku-nodejs-postgres/

# Start the app

To start the app simply run 

```
npm start
```

in the terminal.

# Run the tests

Run 

```
npm test
```

in the terminal.
