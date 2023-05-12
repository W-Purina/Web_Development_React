// 相当于一个目录，将所有API整合到一起，能够通过路径访问
import express from 'express';

const router = express.Router();

// 分别将 users, group, orders 路由挂载到api路径上
import users from './users';
router.use('/users', users)

import group from './group';
router.use('/group', group)

import orders from './orders';
router.use('/orders', orders)

export default router;