require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const mainRouter = require('./routes/index');

const responseError = require('./middlewares/response');

const { PORT = 3000 } = process.env;
const app = express();

const allowedCors = [
  'https://dmm.back.mesto.nomoredomains.monster',
  'http://dmm.front.mesto.nomoredomains.monster',
  'http://dmm.back.mesto.nomoredomains.monster',
  'https://dmm.front.mesto.nomoredomains.monster',
  'localhost:3000',
];
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');

    const { method } = req;

    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const requestHeaders = req.headers['access-control-request-headers'];

    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);

      return res.status(200).send();
    }
  }

  res.header('Access-Control-Allow-Origin', '*');

  return next();
});

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(mainRouter);

app.use(errors());
app.use(responseError);

app.listen(PORT, () => {
  console.log('Сервер запущен и работает в штатном режиме');
});
