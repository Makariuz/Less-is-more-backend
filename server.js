const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const upload = require('./config/cloudstorage')
const { authenticate } = require("./middlewares/jwt.middleware");
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL);

const app = express();

app.use(cors());

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('hello world!')
})

app.post("/test", authenticate, (req, res) => {
  res.send(req.body.test);
});

// name of the file is "myFile" you can change it to whatever you want
app.post('/upload', upload.single('myFile'), (req, res) => {
  res.json(req.file)
})

app.listen(process.env.PORT);
