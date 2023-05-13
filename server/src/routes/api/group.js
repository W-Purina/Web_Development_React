import express from "express";
import {addGroups, updateGroup, InsertUsersInGroupByGroupId, getRecentPurchasesByGroupId, getGroupById, deleteGroupById} from "./../../allData/app";
import mongoose from "mongoose";

const HTTP_CREATED = 201;

const router = express.Router();

// create new Group 创建新的小组（点击加号，输入小组信息，提交表单）
// 谁组建的谁是 host, 调用 addGroups 方法
// 当点击提交按钮之后，跳转到 /api/family/${newGroup._id} 路由，显示家庭信息 （id，成员，账单）
// 请求api: " localhost:3000/api/group "
// 请求body :
// {
//     "groupname": "11",
//     "description": "Sollicitudin.",
//     "createdBy": "6456eb073d477a819c2fa193"
//   }
// 通过测试 ( •̀ ω •́ )y
router.post('/', async(req, res) => {
    const data = req.body;
    if (data.members){
        data.members = data.members.map(member => new mongoose.Types.ObjectId(member.$oid));
    };

    if (data.orders){
        data.orders = data.orders.map(order => new mongoose.Types.ObjectId(order.$oid));
    };

    data.createdBy = new mongoose.Types.ObjectId(data.createdBy.$oid);

    const newGroup = await addGroups(data);
    
    if (newGroup) return res.status(HTTP_CREATED)
    .header('Location', `/api/group/${newGroup._id}`) 
    .json(newGroup);

    return res.sendStatus(422);
})


// 更新小组信息
// 请求 api：“ localhost:3000/api/group/6456eb083d477a819c2fa19a ”
// 请求body：
// {
//     "groupname": "Besad",
//     "description": "Sollicitudin.",
//     "members": [
//       {
//         "$oid": "6456eb073d477a819c2fa185"
//       },
//       {
//         "$oid": "6456eb073d477a819c2fa193"
//       }
//     ],
//     "createdBy": {
//       "$oid": "6456eb073d477a819c2fa193"
//     },
//     "isActive": true,
//     "orders": [
//       {
//         "$oid": "6456eb083d477a819c2fa1ed"
//       }
//     ]
//   }
// 通过测试 ( •̀ ω •́ )y
router.put('/:groupId', async(req, res) => {
    const groupId = new mongoose.Types.ObjectId(req.params.groupId);
    const data = req.body;
    data._id = groupId;

    if (data.members){
        data.members = data.members.map(member => new mongoose.Types.ObjectId(member.$oid));
    };

    if (data.orders){
        data.orders = data.orders.map(order => new mongoose.Types.ObjectId(order.$oid));
    };

    if(data.isActive){
        data.isActive = Boolean(data.isActive);
    };

    data.createdBy = new mongoose.Types.ObjectId(data.createdBy.$oid);

    const newGroup = await updateGroup(data);

    if (newGroup) return res.status(200)
    .header('Location', `/api/users/${newGroup._id}`)
    .json(newGroup);
    res.sendStatus(400); 
})




// 向小组中添加新成员
// 请求 api：localhost:3000/api/group/insertUsersInGroupByGroupId
// 请求 body：
// {
//     "username": "mwallis",
//     "groupid": {"$oid": "645851feac6c8637635240a2"}
// }
// 通过测试 ( •̀ ω •́ )y
router.post('/insertUsersInGroupByGroupId', async (req, res) => {
    const data = req.body;
    const username = data.username;
    const groupId = new mongoose.Types.ObjectId(data.groupid.$oid);
  
    const result = await InsertUsersInGroupByGroupId(username, groupId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  });
  

// 通过groupId获取最近一个月的所有购买记录
// 请求API：“localhost:3000/api/groups/recentPurchases/6458758cd7cb952d83555cdd”
// 请求body：
// {
//     "year":"2021",
//     "month":"10"
// }
// 通过测试 ( •̀ ω •́ )y
router.get('/recentPurchases/:groupid', async (req, res) => {
    const { groupid } = req.params;
    try {
        const result = await getRecentPurchasesByGroupId(groupid);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });


  // 通过groupId查找小组详细信息，不包含order
  router.get('/groupInfo/:groupid', async(req, res) => {
    const { groupid } = req.params;
    try {
        const result = await getGroupById(groupid);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  })

// delete group
// 请求 api：‘ localhost:3000/api/group/deleteGroupById ’
// {
//     "id":{
//         "$oid": "645db5c83b1d552ae2604417"
//     }
// }
// 通过测试 ( •̀ ω •́ )y
router.delete('/deleteGroupById', async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.body.id.$oid);

    const result = await deleteGroupById(id);
  
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
});

export default router;