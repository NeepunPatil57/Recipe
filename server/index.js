const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");


mongoose.connect('mongodb+srv://Neepun:csd@cluster0.nqhktxo.mongodb.net/',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const corsOptions = {
  origin: ["http://localhost:3000", "https://auth-skeleton-client.vercel.app"],
  credentials: true,
  exposedHeaders: ["Authorization"],
};

app.use("/uploads",(req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});

app.use(cors(corsOptions)); 
app.use("/uploads",express.static('uploads'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, looks like you've lost your way...");
});

app.use("/api", routes);


const PORT = 4000; 
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
