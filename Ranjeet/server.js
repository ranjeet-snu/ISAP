const express = require("express");
const app = express();
const path = require('path');
const userRouter = require("./api/users/user.router");
const courseRouter = require("./api/course/course.route");

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
const connection = require("./config/db");
const cookie = require('cookie-parser');
const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key';

app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/users", userRouter);
app.use(express.json());
app.use(cookie());
app.use("/api/course", courseRouter);

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

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    let user_name = (user.firstname);
    const token = jwt.sign({ id: user.id, firstname: user.firstname, lastname: user.lastname }, secretKey);

    res.render('course', { user_name });
  });
});

app.get('/logout', (req, res) => {
  res.render("index");
});

app.get('/enroll', (req, res) => {
  res.render("enroll1");
});

app.get("/", (req, res) => {
  console.log("Home page entered");
  res.render("index");
});

app.get('/sign', (req, res) => {
  res.render('sign');
});

app.get('/course', (req, res) => {
  res.render('course.ejs');
});

app.get('/contact', (req, res) => {
  res.render('contact.ejs');
});

app.get('/reset2', (req, res) => {
  res.render('reset2.ejs');
});

app.post('/reset-password', (req, res) => {
  const { email } = req.body;

  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  connection.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.json({ success: false, message: 'Email not found' });
    }

    return res.json({ success: true });
  });
});

app.post('/confirm-reset', (req, res) => {
  const { email, newPassword } = req.body;

  const updatePasswordQuery = 'UPDATE users SET password = ? WHERE email = ?';
  connection.query(updatePasswordQuery, [newPassword, email], (err, results) => {
    if (err) {
      console.error('Error updating password:', err);
      return res.json({ success: false });
    }

    return res.json({ success: true });
  });
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
  catch (err) {
    console.log(err);
  }
});

var user_name = "";
app.get("/data", (req, res) => {
  const allData = "select * from users";
  var my_name = "Ranjeet"
  connection.query(allData, (err, rows) => {
    if (err) {
      res.send(err);
    } else {
      res.render("read.ejs", { user_name });
    }
  });
});

app.post("/register_user_data", (req, res) => {
  console.log(req.body);
  var f_name = req.body.firstname;
  var l_name = req.body.lastname;
  var email = req.body.email;
  var pass = req.body.password;

  user_name = f_name + " " + l_name;
  try {
    connection.query(
      "INSERT into users (firstname,lastname,email,password) values(?,?,?,?)",
      [f_name, l_name, email, pass],
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
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
