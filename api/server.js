const express = require('express');
const helmet = require('helmet');
const cors = require('cors')

const server = express();

// const { Client } = require('pg')
// const client = new Client({
//   host: "aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com",
//   user: "lambda",
//   password: "password",
//   database: "welldone"
// })
// client.connect()

// const { Pool, Client } = require('pg')
// const pool = new Pool({
//   host: "aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com",
//   user: "lambda",
//   password: "password",
//   database: "welldone",
//   port: 5432,
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// const client = new Client({
//   host: "aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com",
//   user: "lambda",
//   password: "password",
//   database: "welldone",
//   port: 5432,
// })
// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

//---__Works! ----*

// const { Pool, Client } = require('pg')
// const connectionString = 'postgresql://lambda:password@aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com:5432/welldone'
// const pool = new Pool({
//   connectionString: connectionString,
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// const client = new Client({
//   connectionString: connectionString,
// })
// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

//----------*

const Sequelize = require('sequelize');
// const sequelize = new Sequelize('welldone', 'postgres', 'shahid', {
//   host: 'aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com',
//   dialect: 'postgres',
//   pool: {
//     max: 9,
//     min: 0,
//     idle: 10000
//   }
// });
var sequelize = new Sequelize('postgresql://lambda:password@aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com:5432/welldone');

sequelize.authenticate().then(() => {
  console.log("Success!");
}).catch((err) => {
  console.log(err);
});

// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

//routes
// const authRouter = require("./auth/auth.js");


// server.use("/auth", authRouter);


server.get('/', (req, res) => {
    res.send(`
    <h2>Welcome to the Jungle 🌴</h2>
    `)
});

module.exports = server;