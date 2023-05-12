import * as dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import * as url from 'url';
import cors from 'cors';


// Create a express application instance
const app = express();
app.use(express.json());
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
