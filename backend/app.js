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

app.use(cors());

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
