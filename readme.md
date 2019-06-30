## Express-knex Server example application

Express-knex is package to support API server based on Express and Knex.

User Express Generator to generate app. Sample version was 4.16.1

Add packages: 
 
  * `express-knex-server`: Express-knex project itself
  * `express-knex-storage-sqlite`: SQLite driver for storage
  * `cors`: implement CORS support for react-admin to work
 
 `npm i express-knex-server express-knex-storage-sqlite cors` 
 
## Instruction

I use `babel` for transpiling and `standard` for code style:
`npm i --save-dev babel-cli standard`


Transform code for ES6 code styled for Standard:

* convert all require statements to import
* remove all semicolons, 
* convert `var` to `let`/`const`.

In `app.js`: use async style for app initialization function, see code for example.

## Express app initialization steps:

* load environment vars: use dotenv / dotenv-safe
* select view engine: pug by default
* init middlewares: 
    * cors,
    * json,
    * url-encoded
    * cookie support
    * static server
* init storage: 
    * select storage driver,
    * select auth storage driver, 
    * define driver-specific method for open/close storage,
    * init generic methods for data access,
* configure models: 
    * define schemas for models, 
    * configure storage for models, 
    * perform version migrations, 
    * initialize system data, 
    * load seed data
* configure auth: 
    * select auth driver,
    * init models for auth,
    * init middlewares for auth,
    * configure ACL objects / permissions
* configure routes:
    * configure system routes: auth, user system (profile, users, groups, ACLs), 
    * init CRUD routes models,
    * apply ACL for CRUD routes,
* configure error handlers 