const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Connection = require("./database/connection/db");
const PORT = 8000;
const authRoute = require("./routes/auth");
Connection();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); 
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  
  next();
});
app.use("/auth", authRoute);
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});