import express from 'express';
import {addUsers, queryGroupByUserid1, updateUser, queryUserInfoById, deleteUserFromGroup, loginUser, queryBasicInfoByName} from "./../../allData/app";
import mongoose from 'mongoose';

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

// 注册新用户，相应的方法叫 addUsers()
// 请求 api：“ localhost:3000/api/users ”
// 请求body：
// {
    // "username": "newUs11",
    // "password": "Yzh123123",
//     "email": "eld@hivemind.com",
//     "firstName": "El",
//     "lastName": "Ra",
//     "isActive": true,
//     "dateOfBirth": {
//       "$date": "1993-12-25T18:00:17.000Z"
//     },
//     "phonenumber": "553-466-5398",
//     "sex": "male"
//   }
// 通过测试 ( •̀ ω •́ )y
// router.post('/', async(req, res) => {

//     const data = req.body;
//     if(data.groups){
//         data.groups = data.groups.map(member => new mongoose.Types.ObjectId(member.$oid));
//     };
//     if(data.dateOfBirth){
//         data.dateOfBirth = new Date(data.dateOfBirth.$date);
//     };
//     if(data.isActive){
//         data.isActive = Boolean(data.isActive);
//     };
//     // req.body 在这里是 addUsers 所需要的一个 User 实体
//     const newUser = await addUsers(req.body);
    
//     if (newUser) {return res.status(HTTP_CREATED)
//     .json({ message: 'New user has been added to the database.' });}
//     else {return res.sendStatus(422);}
// })
router.post('/', async (req, res) => {
    try {
        const userInfo = req.body;
        if(userInfo.groups){
            userInfo.groups = userInfo.groups.map(member => new mongoose.Types.ObjectId(member.$oid));
        };
        if(userInfo.dateOfBirth){
            userInfo.dateOfBirth = new Date(userInfo.dateOfBirth.$date);
        };
        if(userInfo.isActive){
            userInfo.isActive = Boolean(userInfo.isActive);
        };
        const status = await addUsers(userInfo);
        
        if (status.success) {
            res.status(201).json({ message: 'User created successfully.' });
        } else {
            res.status(400).json({ message: 'Error occurred while adding new user.', error: status.error.message });
        }
    } catch (error) {
        console.error('Error occurred while adding new user:', error);
        res.status(500).json({ message: 'Error occurred while adding new user.' });
    }
  });

// 查找用户信息
// 请求 api：“ localhost:3000/api/users/6456eb073d477a819c2fa185 ”
// 不能带用户密码
// 通过测试 ( •̀ ω •́ )y
router.get('/:userId', async(req, res) => {
    const {userId} = req.params;
    const user = await queryUserInfoById(userId);
    if (user) return res.status(200).header('Location', `api/users/${userId}`).json(user)
    return res.sendStatus(404);
})

// 更新用户信息，通过 id 进行相应的查找，返回更新后的 user 对象信息
// 测试 api：“ localhost:3000/api/users/updateuser ”
// 测试 body 数据：
// {
//     "_id": {
//       "$oid": "6458758bd7cb952d83555cc5"
//     },
//     "username": "sca",
//     "password": "",
//     "email": "stephen.cappel@connic.mobi",
//     "firstName": "Stephen",
//     "lastName": "Cappel",
//     "isActive": true,
//     "groups": [
//       {
//         "$oid": "6458758cd7cb952d83555d0e"
//       },
//       {
//         "$oid": "6458758cd7cb952d83555cdd"
//       }
//     ],
//     "dateOfBirth": {
//       "$date": "1984-03-24T11:40:33.000Z"
//     },
//     "phonenumber": "792-632-3689",
//     "sex": "female"
//   }
// 测试通过 ( •̀ ω •́ )y
router.put('/updateuser', async (req, res) => {
    const user = req.body;
  
    
    if(user._id){
        user._id = new mongoose.Types.ObjectId(user._id.$oid);
    }
    if(user.groups){
        user.groups = user.groups.map(group => new mongoose.Types.ObjectId(group.$oid));
    }
    if (user.dateOfBirth){
        user.dateOfBirth = new Date(user.dateOfBirth.$date);
    }
    try {
        const updatedUser = await updateUser(user);
        if (updatedUser) {
            res.status(200).json({ message: 'User updated successfully', updatedUser });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
  });
// 登录功能
// 请求 api：localhost:3000/api/users/login
// 请求 body：
// {
//     "email": "travis.porras@citisys.mobi",
//     "password": "$2b$10$0TnDSnCCa7sTQZwOxd.4iuO8DUfnLicJ.TsnmDCVtWX8w5oHAff3."
// }
// 测试通过 ( •̀ ω •́ )y
router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;
    try {
    const isValidUser = await loginUser(identifier, password);
    if (!isValidUser) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    return res.status(200)
    .json({ success: isValidUser });
    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
    }
});


// 通过用户名索取用户信息除密码外的信息
// 请求api：localhost:3000/api/users/userinfo/mremus
// 测试通过 ( •̀ ω •́ )y
router.get('/userinfo/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const userInfo = await queryBasicInfoByName(username);
        if (userInfo) {
            res.status(200).json(userInfo);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ message: 'Error fetching user info' });
    }
  });

// delete a member from family 从小组中删除成员
// 请求 api：" localhost:3000/api/users/delete "
// 请求 body：
// {
//     "operatorId":
//       {
//         "$oid": "6458758cd7cb952d83555cce"
//       },
//     "groupId": {
//       "$oid": "6458758cd7cb952d83555cdd"
//     },
//     "userId": {
//         "$oid": "6458758cd7cb952d83555cd6"
//       }
//   }
// 测试通过 ( •̀ ω •́ )y
router.delete('/delete', async(req, res) => {
    const data = req.body;
    const operatorId = new mongoose.Types.ObjectId(data.operatorId.$oid);
    const groupId = new mongoose.Types.ObjectId(data.groupId.$oid);
    const userId = new mongoose.Types.ObjectId(data.userId.$oid);
    const updatedGroup = await deleteUserFromGroup(operatorId, groupId, userId);
    if(updatedGroup) return res.status(200)
    .json(updatedGroup);

    return res.sendStatus(404);
})

// 查看自己加入的所有小组的信息，返回的是每一个小组的实例
// 测试 api：“ localhost:3000/api/users/queryGroupByUserid/645851feac6c86376352408d ”
// 测试通过 ( •̀ ω •́ )y
router.get('/queryGroupByUserid/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
        const groups = await queryGroupByUserid1(userid);
        if (groups) {
            res.status(200).json(groups);
        } else {
            res.status(404).json({ message: 'Groups not found for this user.' });
        }
    } catch (error) {
        console.error('Error querying groups by user ID:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
  });

export default router;