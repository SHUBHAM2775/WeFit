import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let isLogin = false;

function contactUs(){
  console.log("contact us")
}
 
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  if(isLogin === true){
    res.sendFile(__dirname + "/public/welcome.html");
  }
  else{
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.post("/action", (req, res) => {
  const { name } = req.body; // Get the 'name' from the form submission
  isLogin = true;
  // Redirect to welcome.html and pass the name as a query parameter
  res.redirect(`/welcome?name=${encodeURIComponent(name)}`);
});

// Define the '/welcome' route that sends the welcome.html file
app.get("/welcome", (req, res) => {
  res.sendFile(__dirname + "/public/welcome.html");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});