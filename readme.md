## Express-knex Server example application

User Express Generator to generate app. Sample version was 4.16.1

Add packages: 
 
  * `express-knex-server`: Express-knex itself
  * `express-knex-storage-sqlite`: SQLite driver for storage
  * `cors`: implement CORS support for react-admin to work
 
 `npm i express-knex-server express-knex-storage-sqlite cors` 
 
## Instruction

I use `babel` for transpiling and `standard` for code style:
`npm i --save-dev babel-cli standard`

So, i converted all require to import, and code style to standard. `Var` becomes `let`.