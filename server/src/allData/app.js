import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { User, Group, Order } from './schema';
import { randomData } from './random_Data';

// 控制台将告知使用了虚拟数据
console.log("Generated dummy data using dummy-json");

// 目前不清楚有没有用？因为严格查找可能需要加入
mongoose.set('strictQuery', false);

main();

///////////////////////////////////添加测试用例//////////////////////////////////////////////////////
async function main(){
    // 连接数据库
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true});
    console.log('Connected to database!');
    
    // 向数据库里添加东西

    // // 删除操作
    // // 删除User
    // await clearDatabase(User);
    // console.log();

    // // 删除Group
    // await clearDatabase(Group);
    // console.log();
    
    // // 删除Order
    // await clearDatabase(Order);
    // console.log();


    // 添加User操作 -- 目前属于虚拟数据测试，后续应该传入相应的参数
    const newUser = await addUsers_test();
    // console.log('New user:', newUser);

    // 添加Group操作 -- 目前属于虚拟数据测试，后续应该传入相应的参数
    const newGroup = await addGroups_test();
    // console.log('New group:', newGroup);

    // 添加Order操作 -- 目前属于虚拟数据测试，后续应该传入相应的参数
    const newOrder = await addOrders_test();
    // console.log('new Order:', newOrder);


    // 断开数据库
    // await mongoose.disconnect();
    // console.log('Disconnected from database!');
}




/////////////////////////////////////添加测试用例的方法////////////////////////////////////
// 删除指定集合中的所有信息
async function clearDatabase(collection) {
    try {
        await collection.deleteMany({});
        console.log('All documents have been removed from the collection.');
    } catch (error) {
        console.error('Error occurred while removing all documents from the collection:', error);
    }
}

async function addUsers_test() {
    // 使用数据模拟情况 -- 正常情况去除循环，将传入的参数转换成UserInfo，users就是存在schema中的user
    for (let userInfo of randomData.users) {
        // 创造Error捕捉
        try {
            // 创造新的对象
            const newUser = new User(userInfo);
            await newUser.save();
            console.log('New user has been added to the database.');
            // return newUser;
        } catch (error) {
            console.error('Error occurred while adding new user to the database:', error);
        }
    }
}

async function addGroups_test(){
    // 目前仅仅测试阶段，所以会有循环遍历，后续就会删除掉改为传入参数
    for (let groupData of randomData.groups) {
        try {
            // 测试：随机选择几个成员和创造者
            const allUsers = await User.find();
            const createdByIndex = Math.floor(Math.random() * allUsers.length);
            const memberIndex = Math.floor(Math.random() * allUsers.length);
            
            // 测试：创建两个随机变量 -- 一个是createBy,一个是member。
            const createdBy = allUsers[createdByIndex];
            const member = allUsers[memberIndex];

            // 创建一个新的组
            const newGroup = new Group(groupData);

            // 测试：分配memeber和创建者
            newGroup.createdBy = createdBy._id;
            newGroup.members.push(createdBy);
            newGroup.members.push(member._id);
            createdBy.groups.push(newGroup._id);
            member.groups.push(newGroup._id);
            await member.save();
            await createdBy.save();
            
            await newGroup.save();
            console.log('New group has been added to the database.');
            
        } catch (error) {
            console.error('Error occurred while adding new group to the database:', error);
        }
    }
}

async function addOrders_test() {
    // 目前仅仅测试阶段，所以会有循环遍历，后续就会删除掉改为传入参数
    for (let orderData of randomData.orders) {
        try{
            // 测试: 随机选择一个小组
            const allGroups = await Group.find();
            const groupIndex = Math.floor(Math.random() * allGroups.length);
            const group = allGroups[groupIndex];


            // 测试: 随机选择一个人
            const allUsers = await User.find();
            const createdByIndex = Math.floor(Math.random() * allUsers.length);
            const memberIndex = Math.floor(Math.random() * allUsers.length);
            const createdBy = allUsers[createdByIndex];

            // 创建一个新订单
            const newOrder = new Order(orderData);

            // 测试：分配一个Group
            newOrder.group = group._id;
            newOrder.createdBy = createdBy._id;
                
            await newOrder.save();
            console.log('Order added to the database!');
            
            // 测试：应该同步将订单推到Group的全部订单中
            group.orders.push(newOrder._id);
            await group.save();
        } catch (error){
            console.error('Error occurred while adding new order to the database:', error);
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////实际操作////////////////////////////////////////////////////

// 登录操作
async function loginUser(identifier, password) {
    // 通过email或username查找用户
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    if (!user) {
        console.log('User not found.');
        return false;
    }
    
    // 验证密码
    const isPasswordValid = await user.verifyPassword(password);
    if (isPasswordValid) {
        console.log('Password is valid.');
        user.password = undefined;
        return user;
    } else {
        console.log('Password is invalid.');
        return false;
    }
    }

// 添加用户 finish!!!
async function addUsers(userInfo) {
    try {
        // 从 userInfo 中删除 groups 属性
        delete userInfo.groups;
  
        // 创造新的对象
        const newUser = new User(userInfo);
        await newUser.save();
        console.log('New user has been added to the database.');
        return { success: true, user: newUser };
    } catch (error) {
        console.error('Error occurred while adding new user to the database:', error);
        return { success: false, error};
    }
  }

// 传递一个用户之后按照其username进行查找
// 风险提示： 目前使用username进行锁定，但是如果修改username就不行了
async function updateUser(user) {
    // 如果密码为null，从user对象中删除password属性
    if (user.password === "") {
    delete user.password;
    }

    // 获取传入的_id字符串
    const userId = user._id;
    // 从数据库中找到要更新的用户
    const userToUpdate = await User.findOne({ _id: userId });

    if (!userToUpdate) {
    console.error('User not found');
    return { success: false, message: 'User not found' };
    }
    // 使用Object.assign将新的用户信息复制到要更新的用户对象上
    Object.assign(userToUpdate, user);

    // 使用save()方法触发pre-save中间件以对密码进行哈希处理
    await userToUpdate.save();

    // 更新用户信息
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, userToUpdate, { new: true });
    console.log("UPDATE User SUCCESS");

    updatedUser.password = undefined;
    return updatedUser;
  }

// 根据 id 查找用户信息
async function queryUserInfoById(userId) {
    try {
        const user = await User.findById(userId).populate('groups', 'groupname -_id');
    
        if (user) {
        console.log('User found:', user);
        return user;
        } else {
        console.log('User not found');
        return null;
        }
    } catch (error) {
        console.error('Error querying user by ID:', error);
        throw error;
    }
}

// 添加小组 finished!!!!
async function addGroups(groupData) {
    try {
      // 创建一个新的组
        const newGroup = new Group(groupData);
        // console.log(newGroup);
        // 从 groupData 中读取 createBy 信息
        const createdByUser = await User.findById(new mongoose.Types.ObjectId(groupData.createdBy));
        console.log(createdByUser)
        if (createdByUser) {
            // 将 createBy 用户添加到组成员列表中
            newGroup.members.push(createdByUser._id);
        } else {
            console.error(`User with ID ${groupData.createdBy} not found`);
        }
        
        await newGroup.save();
        
      // 向所有组成员的group信息插入当前组
        for (const memberId of newGroup.members) {
        const user = await User.findById(memberId);
        if (user) {
            user.groups.push(newGroup._id);
            await user.save();
        } else {
            console.error(`User with ID ${memberId} not found`);
        }}
        console.log('New group has been added to the database and members updated.');
        return newGroup;
    } catch (error) {
        console.error('Error occurred while adding new group to the database:', error);
        return null;
    }
}

// 更新小组信息
async function updateGroup(group) {
    try {
    // 查找原始小组
    const originalGroup = await Group.findById(group._id);

    // 找不到原有小组就会输出找不到
    if (!originalGroup) {
        console.log("Group not found");
        return null;
    }

    // 检查新成员是否与原始成员不同
    const membersChanged = !areArraysEqual(
        originalGroup.members.map((member) => member.toString()),
        group.members.map((member) => member.toString())
    );

    // 如果成员已更改，请更新新成员的 groups 信息
    if (membersChanged) {
        // 查找原始成员和新成员之间的差异
        const newMembers = group.members.filter(
        (member) => !originalGroup.members.includes(member)
        );

        // 更新新成员的 groups 信息
        for (const newMemberId of newMembers) {
        const newMember = await User.findById(newMemberId);
        if (newMember) {
            newMember.groups.push(group._id);
            await newMember.save();
        }
        }
    }

    // 更新小组
    const updatedGroup = await Group.findOneAndUpdate(
        { _id: group._id },
        group
    );
    console.log("UPDATE Group SUCCESS");
    return updatedGroup;
    } catch (error) {
    console.error("Error updating group:", error);
    return null;
    }
}

// Utility function to check if two arrays are equal
function areArraysEqual(arr1, arr2) {
    return (
        arr1.length === arr2.length &&
        arr1.every((element, index) => element === arr2[index])
    );
}

// 删除小组中的用户
async function deleteUserFromGroup(operatorId, groupId, userId) {
    try{
        const group = await Group.findById(groupId);
        console.log(groupId);
        console.log(operatorId,groupId,userId);
        if (!group){
            console.log('Group not found');
            return { success: false, message: 'Group not found' };
        }

        if (group.createdBy.toString() === operatorId.toString()){
            const memberIndex = group.members.findIndex((member) => member.toString() === userId.toString());
            if (memberIndex !== -1) {
                // splice方法接受两个参数：要删除的元素的索引（memberIndex）和要删除的元素数量（1，表示仅删除一个元素
                group.members.splice(memberIndex, 1);
                await group.save();
                console.log('User removed from group');
                return { success: true, message: 'User removed from group' };
            } else {
                console.log('User not found in group');
                return { success: false, message: 'User not found in group' };
            }
        } else {
            console.log('Operator not authorized');
            console.log(group.createdBy.toString());
            console.log(operatorId.toString());
            return { success: false, message: 'Operator not authorized' };
        }
    } catch (error) {
        console.error('Error deleting user from group:', error);
        throw error;
    }
    
    }


// 添加新 order finished!!!!
async function addOrders(orderData) {
    // 目前仅仅测试阶段，所以会有循环遍历，后续就会删除掉改为传入参数
    try{
        // 创建一个新订单
        const newOrder = new Order(orderData);

        // 保存新订单到数据库
        await newOrder.save();
        console.log('Order added to the database!');

        // 获取该订单的group ID
        const groupId = orderData.group;
        console.log(groupId)

        // 在数据库中查找该group
        const group = await Group.findById(groupId);
        
        if (!group) {
            console.error(`Error: Group with ID ${groupId} not found.`);
            return;
        } 
        group.orders.push(newOrder._id);

        await group.save();
        console.log(`Order added to the group with ID ${groupId}.`);
        return newOrder;
    } catch (error){
        console.error('Error occurred while adding new order to the database:', error);
    }
}

// 向 group 表的 orders 列表添加新的账单 id  叫 addNewBillToGroup()
// 按日期查找账单 finished!!!!
async function queryByDate(groupId, year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const orders = await Order.find({
        group: groupId, // 查找 groupId 与给定 groupId 匹配的订单
        purchaseDate: {
            $gte: startDate, // purchaseDate 大于等于 startDate
            $lt: endDate, // purchaseDate 小于 endDate
        },
    }).select('storename purchaseDate totalPrice group createdBy')
      .populate([
          { path: 'group', select: 'groupname' },
          { path: 'createdBy', select: 'username' }
      ]);

    const ordersWithGroupNameAndCreatorName = orders.map((order) => {
        const orderObj = order.toObject();
        orderObj.groupName = orderObj.group.groupname;
        orderObj.createdBy = orderObj.createdBy.username;
        delete orderObj.group;
        return orderObj;
    });

    return ordersWithGroupNameAndCreatorName;
}

// 查找用户所在所有小组
async function queryGroupByUserid1(userid) {
    try {
        const user = await User.findById(userid).populate({
            path: 'groups',
            select: '_id groupname members',
            populate: {
                path: 'members',
                select: 'username',
            },
        });
  
        const groups = user.groups;
        const groupDetails = [];
        for (const group of groups) {
            const fullGroup = await Group.findById(group._id).populate('orders');
            let totalCost = 0;
  
            for (const order of fullGroup.orders) {
                // 判断现在是否是当月信息
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();
                const orderDate = new Date(order.createdAt); // 假设您的订单模型中存在一个名为 `createdAt` 的日期字段
                const isCurrentMonth = orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
  
                if (isCurrentMonth) {
                    totalCost += order.totalPrice;
                }
            }
            
            groupDetails.push({
                _id: group._id,
                groupname: group.groupname,
                members: group.members.map((member) => member.username),
                currentMonthCost: totalCost,
            });
        }
  
        return groupDetails;
    } catch (error) {
        console.error('Error fetching groups for user:', error);
        throw error;
    }
  }

// 通过 ID 删账单
async function deleteOrderById(orderId) {
    try {
      // Find the order by its ID
      const order = await Order.findById(orderId);
  
      if (!order) {
        console.log('Order not found:', orderId);
        return { success: false, message: 'Order not found' };
      }
  
      // Find the group associated with the order
      const group = await Group.findById(order.group);
  
      if (!group) {
        console.log('Group not found for order:', orderId);
        return { success: false, message: 'Group not found for order' };
      }
  
      // Remove the order ID from the group's orders array
      const orderIndex = group.orders.findIndex((o) => o.toString() === orderId.toString());
      if (orderIndex !== -1) {
        group.orders.splice(orderIndex, 1);
        await group.save();
        console.log('Order removed from the group:', orderId);
      } else {
        console.log('Order not found in the group:', orderId);
      }
  
      // Finally, delete the order
      await Order.findByIdAndDelete(orderId);
      console.log('Order deleted successfully:', orderId);
      return { success: true, message: 'Order deleted successfully' };
    } catch (error) {
      console.error('Error occurred while deleting the order:', error);
      return { success: false, message: 'Error occurred while deleting the order', error };
    }
  }

// 找组内成员
async function queryMembersByGroup(group){
    const members = group.members;
    return members;
}

// 向小组中插入用户
async function InsertUsersInGroupByGroupId(username, groupId){
    try {
        const user = await User.findOne({ username: username });
        const group = await Group.findOne({ _id: groupId });
        if (!user || !group) {
            console.log('User or group not found');
            return { success: false, message: 'User or group not found' };
        }
        if (!group.members.includes(user._id)) {
            group.members.push(user._id);
            await group.save();
        }
        if (!user.groups.includes(group._id)) {
            user.groups.push(group._id);
            await user.save();
        }
        console.log('User added to group');
        return { success: true, message: 'User added to group' };
    } catch (error) {
        console.error('Error inserting user into group:', error);
        throw error;
    }
  
  }

// 查找用户的基础用户信息不包含密码
async function queryBasicInfoByName(username) {
    try {
        // 根据用户名查询用户，但不包括密码字段
        const user = await User.findOne({ username: username }).select('-password');
        
        if (!user) {
            console.error('User not found');
            return null;
        }
        
        return user;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
  }

  // 通过groupId获取所有购买记录
  async function getRecentPurchasesByGroupId(groupid) {
    try {
        const group = await Group.findById(groupid).populate('orders');
        if (!group) {
            console.error('Group not found');
            return { success: false, message: 'Group not found' };
        }
  
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
  
        const recentPurchases = group.orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            const isCurrentMonth = orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
            return isCurrentMonth;
        });
  
        const productNames = recentPurchases.map(purchase => purchase.productName);
  
        return { success: true, productNames };
    } catch (error) {
        console.error('Error fetching recent purchases by group id:', error);
        throw error;
    }
  }

  // 通过orderId查找账单
  async function queryOrderById(orderId){
    try{
        const order = await Order.findById(orderId);
        return order;
    }catch(error){console.error('Error fetching order by order id:', error);}
  }

export{
    clearDatabase, 
    addUsers, 
    addGroups, 
    addOrders, 
    updateUser, 
    queryByDate,
    queryGroupByUserid1,
    queryMembersByGroup, 
    queryUserInfoById,
    deleteUserFromGroup,
    updateGroup,
    loginUser,
    deleteOrderById,
    InsertUsersInGroupByGroupId,
    queryBasicInfoByName,
    getRecentPurchasesByGroupId, 
    queryOrderById
}