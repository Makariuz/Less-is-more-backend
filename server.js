const express = require("express");
const client = require("@sendgrid/mail")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const upload = require('./config/cloudstorage')
const { authenticate } = require("./middlewares/jwt.middleware");
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL);

client.setApiKey(process.env.SENDGRID_API_KEY);

client.send({
  to: {
    email: process.env.MY_SECRET_EMAIL,
    name: 'Peter'
  },
  from: {
    email:process.env.MY_SECRET_EMAIL,
    name: 'Patrick'
  },
  templateId: 'd-dba860df06bc47939a93f429449bf070',
  dynamicTemplateData: {
    name: 'Peter!!',
  },
}).then(() => {
  console.log('Email was sent')
})

const app = express();

app.use(cors());

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('hello world!!')
})

app.post("/test", authenticate, (req, res) => {
  res.send(req.body.test);

  
});

// name of the file is "myFile" you can change it to whatever you want
app.post('/upload', upload.single('myFile'), (req, res) => {
  res.json(req.file)
})

app.listen(process.env.PORT);
