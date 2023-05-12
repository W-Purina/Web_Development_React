import * as dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import * as url from 'url';
import cors from 'cors';
import authRoute from './routes/auth';
import jwt from 'jsonwebtoken';


// Create a express application instance
const app = express();
app.use(express.json());


// 高危预警
app.use(cors());
function authenticateToken(req, res, next) {
    // 白名单：login / create user
    if (req.path === '/auth/login') {
        return next(); // 如果请求是登录，跳过验证
    }
    if (req.path === '/api/users') {
        return next(); // 如果请求是登录，跳过验证
    }
    // 获取 auth-token 头
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401); // 如果没有 token，返回 401
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // 如果 token 不合法，返回 403
      req.user = user; // 将用户信息附加到请求对象上
      next(); // 调用下一个中间件或路由处理器
    });
}


app.use(authenticateToken);

app.use('/auth', authRoute);


// Define the port number to listen on
const port = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
    res.send('Hello, this is your server!');
});

import routes from './routes'; // 导入路由模块（相应的routes文件夹）
app.use('/', routes); // 将这些路由添加到Express服务器的根路径（‘/’）


// app.listen(port, () => {
// console.log(`Server is running on port ${port}`);
// });

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => app.listen(port, () => console.log(`App server listening on port ${port}!`)));
