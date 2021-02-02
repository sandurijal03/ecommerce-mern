import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

import userApi from './apis/userApi';

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  }),
);

mongoose.connect(
  `${process.env.MONGO_URI}/${process.env.MONGO_NAME}`,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('DATABASE CONNECTED');
  },
);

app.use('/user', userApi);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('server is listening on port ', port));
