require('dotenv').config();
const express = require('express');
const cors = require('cors');
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
  'localhost:3000',
];

app.use(cors());
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req; // Сохраняем тип запроса (HTTP-метод)
  // значение для заголовка Access-Control-Allow-Methods по умолчанию
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    // заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.status(200).send();
  }

  next();
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
