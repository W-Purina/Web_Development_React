// 当在server中引用这个文件时，就可以访问全部的api了（a. server.js）
import express from 'express';
import api from './api'

const router = express.Router();

router.use('/api', api)

export default router;