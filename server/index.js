const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
require('dotenv').config();

const app = express();
const { logger } = require('./logger/logger');
const { initilizeServer } = require('./config/initilizeServer');
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: logger }));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
  limit: '1gb'
}));
(() => initilizeServer(app))(); // listen server

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now() + file.originalname}.png`);
  }
});
const uploads = multer({ storage: storageEngine });

app.post('/store-image', uploads.single('blob'), (req, res) => {
  // req.on('readable', () => console.log(req.read()));
  console.log(req.file);
  res.send('success');
});
