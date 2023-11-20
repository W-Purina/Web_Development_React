# 后端API介绍
为前端应用程序提供了 RESTful API。后端使用 Node.js、Express 和 MongoDB 构建。

## 目录
- [数据架构](#Aritecture)
- [API端点设计](#API-Endpoints)
- [测试](#Testing)
## Aritecture
后端使用模型-视图-控制器（MVC）模式构建，模型代表数据库模式，控制器处理业务逻辑，路由定义 API 端点。该项目还使用 JWT（JSON Web Token）进行用户认证和授权。

##   API Endpoints
以下是可用 API 端点的概览：
- /auth: 使用 JWT 的登录功能
- /api/users: 用户创建和管理
- /api/group: 小组创建和管理
- /api/orders: 订单创建和管理

### auth.js
- 登录
    - 使用 **loginUser()** 
    - Method: POST
    - API: ```http://localhost:3000/auth/login```
    - Request body : 
    ```{js}
    {
        "identifier": "newUs11",
        "password": "Yzh123123" 
    }
    ```
    - Pass the plaintext password
### users.js
- 创建新账户 :  
    - 使用 **addUser()**   
    - Method: POST
    - API: ```http://localhost:3000/api/users```
    - Request body:  
    ```{js}
    {
        "username": "newUs11",
        "password": "Yzh123123",
        "email": "eld@hivemind.com",
        "firstName": "El",
        "lastName": "Ra",
        "isActive": true,
        "dateOfBirth": {
            "$date": "1993-12-25T18:00:17.000Z"
        },
        "phonenumber": "553-466-5398",
        "sex": "male"
  }
    ```
- 获取用户信息： :
    - 使用 **queryUserInfoById()** 
    - Method: GET
    - API: ```http://localhost:3000/api/users/:userId``` 
- 更新用户信息: 
    - 使用 **updateUser()** 
    - Method: PUT
    - API: ```http://localhost:3000/api/users/updateuser```
    - Request body:  
    ```{js}
    {
        "_id": {
            "$oid": "6458758bd7cb952d83555cc5"
        },
        "username": "sca",
        "password": "",
        "email": "stephen.cappel@connic.mobi",
        "firstName": "Stephen",
        "lastName": "Cappel",
        "isActive": true,
        "groups": [
            {
                "$oid": "6458758cd7cb952d83555d0e"
            },
            {
                "$oid": "6458758cd7cb952d83555cdd"
            }
        ],
        "dateOfBirth": {
            "$date": "1984-03-24T11:40:33.000Z"
        },
        "phonenumber": "792-632-3689",
        "sex": "female"
  }
    ```
- 通过用户名选择用户
    - 使用 **queryBasicInfoByName()** 
    - Method: GET
    - API: ```http://localhost:3000/api/users/userinfo/:username```
- 从家庭中删除成员
    - 使用 **deleteUserFromGroup()** 
    - Method: DELETE
    - API: ```http://localhost:3000/api/users/delete```
    - Request body:
    ```{js}
    {
        "operatorId":
        {
            "$oid": "6458758cd7cb952d83555cce"
        },
        "groupId": {
        "$oid": "6458758cd7cb952d83555cdd"
        },
        "userId": {
            "$oid": "6458758cd7cb952d83555cd6"
        }
  }
    ```
- Select information about all groups that user join
    - 使用 **queryGroupByUserid1()** 
    - API: ```localhost:3000/api/users/queryGroupByUserid/:userId```
  
### group.js
- 创建新小组
    - 使用 **addGroups()** 
    - Method: POST
    - API: ```http://localhost:3000/api/group```
    - Request body:
    ```{js}
    {
        "groupname": "11",
        "description": "Sollicitudin.",
        "createdBy": "6456eb073d477a819c2fa193"
    }
    ```
- 更新小组信息
    - 使用 **updateGroup()** 
    - Method: PUT
    - API: ```http://localhost:3000/api/group/:groupId```
    - Request body:
    ```{js}
    {
        "groupname": "Besad",
        "description": "Sollicitudin.",
        "members": [
            {
                "$oid": "6456eb073d477a819c2fa185"
            },
            {
                "$oid": "6456eb073d477a819c2fa193"
            }
        ],
        "createdBy": {
            "$oid": "6456eb073d477a819c2fa193"
        },
        "isActive": true,
        "orders": [
            {
                "$oid": "6456eb083d477a819c2fa1ed"
            }
        ]
    }
    ```
- 添加新的小组组员
    - 使用 **InsertUsersInGroupByGroupId()** 
    - Method: POST
    - API: ```http://localhost:3000/api/group/insertUsersInGroupByGroupId```
    - Request body:
    ```{js}
    {
        "username": "mwallis",
        "groupid": {"$oid": "645851feac6c8637635240a2"}
    }
    ```
- 按组ID获取最近的购买记录
    - 使用 **getRecentPurchasesByGroupId()** 
    - Method: GET
    - API: ```http://localhost:3000/api/group/recentPurchases/:groupId```
- 通过组ID删除组
    - 使用 **deleteGroupById()** 
    - Method: DELETE
    - API: ```http://localhost:3000/api/group/deleteGroupById```
    - Request body:
    ```{js}
        {
            "id":{
                "$oid": "645db5c83b1d552ae260441e"
            }
        }
    ```

  
### orders.js
- 添加新订单
    - 使用 **addOrders()** 
    - Method: POST
    - API: ```http://localhost:3000/api/orders/addNewOrders```
    - Request body:
    ```{js}
    {
        "storename": "countdown",
        "group": {"$oid": "645db5c83b1d552ae2604417"},
        "createdBy":{"$oid": "645db5c83b1d552ae2604408"},
        "items": [
            {
                "productname": "milk",
                "unitprice": 83,
                "amount": 3,
                "productprice": 99
            },
            {
                "productname": "apple",
                "unitprice": 77,
                "amount": 1,
                "productprice": 58
            },
            {
                "productname": "banana",
                "unitprice": 2,
                "amount": 10
            },
            {
                "productname": "book",
                "unitprice": 58,
                "amount": 10,
                "productprice": 30
            }
        ],
        "purchaseDate": {"$date": "2021-08-22T13:13:34.000Z"}
    }
    ```
- 按购买日期选择订单
    - 使用 **queryByDate()** 
    - Method: GET
    - API: ```http://localhost:3000/api/orders/queryByDate/:groupId/:year/:month```
- 按订单 ID 选择订单
    - 使用 **queryOrderById()** 
    - Method: GET
    - API: ```http://localhost:3000/api/orders/:orderId```
- 通过 ID 删除账单
    - 使用 **deleteOrderById()** 
    - Method: DELETE
    - API: ```http://localhost:3000/api/orders/delete```
    - Request body:
    ```{js}
    {
        "id":{"$oid": "6458758cd7cb952d83555d2a"}
    }
    ```


## 测试

测试分为两个主要阶段：

### Phase 1: 使用 HBS 初始化数据库
在这个阶段，我们设置测试数据库。这包括以下步骤：

1. 创建 `random_Data.hbs` 文件：该文件将包含用于生成测试数据的 Handlebars 模板。

2. 创建 `random_Data.js` 文件：该文件将运行 Handlebars 模板并用生成的测试数据填充数据库。

3. 运行 `random_Data.hbs` 和 `random_Data.js`：执行这些脚本以用生成的数据初始化数据库。

### Phase 2: 使用 Postman 进行测试
在第二阶段，我们使用 Postman 应用程序测试每个操作。

1. **导入集合**:导入仓库中提供的 Postman 集合。此集合包含了所有可用 API 端点的预配置请求。

2. **运行请求**: 对于每个 API 端点，在 Postman 中选择相应的请求并点击“发送”。在“响应”窗格的“Body”部分检查结果。确保返回的数据符合你的预期。

### 示例
**使用 HBS 初始化数据库**
```{js}
async function addUsers_test() {
    // Utilize data simulation -- under normal circumstances, remove the loop, and convert the input parameters into UserInfo, where 'users' is the storage.
    for (let userInfo of randomData.users) {
        // Create Error Catching
        try {
            // create new object
            const newUser = new User(userInfo);
            await newUser.save();
            console.log('New user has been added to the database.');
            // return newUser;
        } catch (error) {
            console.error('Error occurred while adding new user to the database:', error);
        }
    }
}
```
**使用 Postman 进行测试**  
```{js}
// Get user information
// Require api：“ http://localhost:3000/api/users/6456eb073d477a819c2fa185 ”

router.get('/:userId', async(req, res) => {
    const {userId} = req.params;
    const user = await queryUserInfoById(userId);
    if (user) return res.status(200).header('Location', `api/users/${userId}`).json(user)
    return res.sendStatus(404);
})
```
