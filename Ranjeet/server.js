const express = require("express"); //express package initiated
const app = express(); // express instance has been created and will be access by app variable
const path = require('path');
const userRouter = require("./api/users/user.router");   // to use router module
const courseRouter = require("./api/course/course.route");

app.set("view engine", "ejs");   //ejs template for sending data from backend to frontend
app.set('views', path.join(__dirname, 'views'));  // saying where our view folder is
//app.set('views',  'views');
var bodyParser = require("body-parser");      // used for getting data from frontend
app.use(bodyParser.urlencoded({ extended: true }));     // say to get url link data
app.use(bodyParser.json());            //say to get json data from frontend
app.use(express.json());  

const connection=require("./config/db");       // need to acces db.js file
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Secret key for JWT
const secretKey = 'your-secret-key';
//app.use(express.static(__dirname + "/public"));   //say to use all html file of frontend
app.use(express.static(path.join(__dirname, 'public')));    //builtin middleware to allow to use all file in public
//console.log(path.join(__dirname, 'public'));
//app.use(express.static(path.join(__dirname, 'views')));  //including all te file of view for the operation
//console.log(path.join(__dirname, 'views'));
//middleware to set router
app.use("/api/users",userRouter);   //foward my url start from api/users/ to UserRout
app.use(express.json());
app.use(cookie());
app.use("/api/course",courseRouter); 

// Middleware function for authentication
function authenticate(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Login route to generate JWT
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Check the user credentials against the MySQL database
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    // Check if a user with the provided credentials exists
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // User authentication successful, generate JWT token
    const user = results[0];
    //console.log(user);
    let user_name = (user.firstname);
    const token = jwt.sign({ id: user.id, firstname: user.firstname, lastname: user.lastname }, secretKey);

    // Render the course.ejs template and pass user information
    res.render('course', { user_name });
  });
});


app.get('/logout', (req, res) => {
  //res.json({ message: 'Logout successful' });
  res.render("index");
});

app.get('/enroll', (req, res) => {
  //res.json({ message: 'Logout successful' });
  res.render("enroll1");
});


app.get("/", (req, res) => {
  console.log("Home page entered");
  res.render("index");
  //res.redirect("/register.ejs");
  //res.send("hello jee");
  
});
// to refer on sign page
app.get('/sign', (req, res) => {
  res.render('sign');
});

app.get('/course', (req, res) => {
  res.render('course.ejs');
});

app.get('/contact', (req, res) => {
  res.render('contact.ejs');
});

app.get('/reset', (req, res) => {
  res.render('reset2.ejs');
});

app.get("/admin", (req, res) => {
    res.redirect("/admin.html");
  });

app.get("/register", (req, res) => {
    res.redirect("/register.html");
  });
app.get('/redirect', (req, res) => {
    console.log(" button click register");
    res.render("register.ejs");
});
app.post("/create", (req, res) => {
    try {
       console.log(req.body);
    }
    catch(err){
        console.log(err);
    }
  });
var user_name="";
app.get("/data", (req, res) => {
    const allData = "select * from users";
    var my_name="Ranjeet"
    connection.query(allData, (err, rows) => {
      if (err) {
        res.send(err);
      } else {
        // res.json({ rows });
        res.render("read.ejs", { user_name });    //render use to send the data in html
      }
    });
  });
app.post("/register_user_data", (req, res) => {
    console.log(req.body);
    var f_name = req.body.firstname;
    var l_name = req.body.lastname;
    var email = req.body.email;
    var pass= req.body.password;

    user_name=f_name+" "+l_name;
  try {
    connection.query(
      "INSERT into users (firstname,lastname,email,password) values(?,?,?,?)", 
      [f_name,l_name, email,pass],
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          // res.json({ result });
          res.redirect("/data");  
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
});
    

app.listen(4600);
console.log("Server running.... on port 4600");