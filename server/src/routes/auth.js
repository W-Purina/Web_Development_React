import express from 'express';
import mongoose from 'mongoose';
import {loginUser,} from '../allData/app';
import jwt from 'jsonwebtoken';

const router = express.Router();


// ... other required imports
router.post('/login', async (req, res) => {
    const {identifier, password} = req.body;
    
    // 任何一个属性缺失都不行
    if (!identifier || !password) {
        return res.status(400).json({ message: 'Identifier and password are required' });
    }

    try {
        const user = await loginUser(identifier, password);
        if (user){
            // 每一次用户登录只有14小时的授权
            const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET,{expiresIn: '14h' });
            delete user.password;
            console.log(user);
            return res.header('auth-token', token).status(200).json({ message: 'Password is valid', token: token, user: user });
        } else {
            
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error validating password:', error);
        return res.status(500).json({ message: 'An error occurred while validating the password' });
    }
});

function authenticateToken(req, res, next) {
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

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user});
});


export default router;