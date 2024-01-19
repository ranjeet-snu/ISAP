const express = require('express');
const mssql = require('mssql/msnodesqlv8');

const app = express();

//app.use(express.json());
//app.use(express.urlencoded({extended: true}));

//database connection config
var config = {
    server: 'LINKOLJAN24-309\\SQLEXPRESS01',
    database: 'test',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true,
    }
}


const pool = new mssql.ConnectionPool(config);

function dbMiddleware(req, res, next) {
  pool.connect((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).send('Database error');
      return;
    }
    req.db = connection;
    next();
  });
}


module.exports = { dbMiddleware };