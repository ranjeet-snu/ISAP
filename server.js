const express = require("express");
const sql = require("mssql/msnodesqlv8");
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'frontend')));

//if(process.env.NODE_ENV !== "production") require("dotenv").config();

var config = {
    server: "LINKOLJAN24-307\\SQLEXPRESS",
    database: "temp1",
    driver:"msnodesqlv8",
    options: {
        trustedConnection: true,
    }  
}
let fullname = "";
let userid = "";
let password = "";
const db = sql.connect(config, function(err){
    if(err) console.error(err);
    let request = new sql.Request();
    request.query("Select * from _user where userid=1", function(err, records) {
        if(err) console.error(err);
        else {
            fullname = records.recordset[0].F_Name + " " + records.recordset[0].L_Name;
            userid = "00" + records.recordset[0].userid;
            password = records.recordset[0].Password;
            console.log(fullname, userid, password);
        }
    });
});
app.listen(8080, () => {
    console.log("Server listening at 8080")
})

// let userName = document.getElementById("user_name");
// userName.innerHTML = `<div class="col-md-9 text-secondary" id="user_name">${fullname}</div>`
// document.getElementById("userID").innerHTML = `<h3 id="userID">${userid}</h3>`;
// document.getElementById("password").innerHTML = `<div class="col-md-9 text-secondary">${password}</div>`
// console.log(result);
// console.log(userName);

// app.get('/', (req, res) => {
//     res.render(path.join(__dirname, 'index.html'));
// })
app.get('/Rishiraj', (req, res) => {
    res.json({
        fullname, userid, password
    })
})


