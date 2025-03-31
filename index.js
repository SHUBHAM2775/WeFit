import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Add session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

function contactUs(){
  console.log("contact us")
}
 
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    if (req.session.isLogin) {
        res.redirect(`/welcome?name=${encodeURIComponent(req.session.name)}`);
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.post("/action", (req, res) => {
    const { name } = req.body;
    req.session.isLogin = true;
    req.session.name = name;
    res.redirect(`/welcome?name=${encodeURIComponent(name)}`);
});

// Define the '/welcome' route that sends the welcome.html file
app.get("/welcome", (req, res) => {
  res.sendFile(__dirname + "/public/welcome.html");
});

app.get("/home", (req, res) => {
    if (req.session.isLogin) {
        res.redirect(`/welcome?name=${encodeURIComponent(req.session.name)}`);
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});

app.get("/calc", (req, res) => {
  res.sendFile(__dirname + "/public/fit-calc.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
  // res.send("Hello World");
});

app.get("/workout", (req, res) => {
  res.sendFile(__dirname + "/public/workout.html");
});

app.get("/diet", (req, res) => {
  res.sendFile(__dirname + "/public/diet.html");
});

app.get("/book_class", (req, res) => {
  res.sendFile(__dirname + "/public/book_class.html");
});

app.get("/track", (req, res) => {
    if (req.session.isLogin) {
        res.sendFile(__dirname + "/public/track.html");
    } else {
        res.redirect('/');
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});