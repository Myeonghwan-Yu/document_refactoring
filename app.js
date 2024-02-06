import express from 'express';
import cookieParser from 'cookie-parser';
import UsersRouter from './routers/users.router.js';
import PostRouter from './routers/documents.router.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api', [UsersRouter, PostRouter]);

app.get('/', (req, res) =>{
  console.log('hello');
})

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});