const mysql = require('mysql');
const express = require('express');

const app = express();
const bodyParser=require('body-parser');
// First you need to create a connection to the database
// Be sure to replace 'user' and 'password' with the correct values
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sitepoint'
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.use(bodyParser.json());
r1=[];
app.get('/api/stuff', (req, res, next) => {
con.query('SELECT * FROM authors', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
    res.end(JSON.stringify(rows));
    r1.push(rows);
    console.log(r1);
  });
  res.status(200).json();
});
/*function a1(r1)
{
  con.query('SELECT * FROM authors', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
    r1.push(rows);
    console.log(r1);
  });
}*/

/*con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all remaining queries are executed
  // Then sends a quit packet to the MySQL server.
});*/
module.exports=app;
