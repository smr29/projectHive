import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import Connection from "./database/connection/db.js";
import authRoute from "./routes/auth.js";
// import teamRoute from "./routes/team.js";
import projectRoute from "./routes/project.js";

const PORT = 8000;

const app = express();

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
// app.use("/team", teamRoute);
app.use("/project", projectRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});