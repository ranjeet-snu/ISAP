// const express = require('express');
// const sql = require('mssql/msnodesqlv8');
// //const mssql = require('mssql/msnodesqlv8');

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// //database connection config
// var config = {
//     server: 'LINKOLJAN24-309\\SQLEXPRESS01',
//     database: 'test',
//     driver: 'msnodesqlv8',
//     options: {
//         trustedConnection: true,
//     }
// }
// let name = "John Doe";
// let email = "abc@gmail.com";
// let rating = "4.5";
// let comments = "nice one!";
// const db = sql.connect(config, function(err){
//     if(err) console.error(err);
//     else {
//         let request = new sql.Request();
//         var query = `INSERT INTO test.dbo.feedback (name, email, rating, comments) VALUES ('${name}', '${email}', '${rating}', '${comments}')`;
//     request.query(query, function(err) {
//         if(err) console.error(err);
//         else console.log("Inserted");
//     });
// }});




 



const express = require("express");
const path = require('path');
const mssql = require('mssql/msnodesqlv8');
const bodyParser = require('body-parser');
const dbMiddleware = require('./db'); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(dbMiddleware);

app.use(express.static('public'));


app.post('/submit-feedback', async (req, res) => {console.log(req.body.name)
    try {
      const { name, email, rating, comments } = req.body;
  
      const request = new mssql.Request(req.db); // Access database connection from middleware
     
      await request.query(`INSERT INTO test.dbo.feedback (name, email, rating, comments) VALUES 
        ('${name}', '${email}', '${rating}', '${comments}')`);
  
      res.json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit feedback' });
    }
  });


  app.get('/', (req, res) => {console.log(`${req.body.name}`)
  res.sendFile(path.join(__dirname, 'public', 'feedback.html'));
});
  


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});