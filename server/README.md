# The Backend
This is the backend part of the Project Group Notable Nightingales, which provides a RESTful API for the frontend application. The backend is built using Node.js, Express, and MongoDB.
## Table of Contents
- [Architecture](#Aritecture)
- [Installation](#Installation)
- [API Endpoints](#API-Endpoints)
- [Testing](#Testing)
- [Contributors](#Contributors)
## Aritecture
The backend is structured using the Model-View-Controller (MVC) pattern, where the models represent the database schema, the controllers handle the business logic, and the routes define the API endpoints. The project also uses JWT (JSON Web Token) for user authentication and authorization.
##  Installation
Follow these steps to set up the backend locally:
1. Clone the repository:
```{}
    git clone https://github.com/UOA-CS732-SE750-Students-2023/project-group-notable-nightingales.git
    cd project-group-notable-nightingales/server
```
2. Install dependencies:
```{}
npm install
```
3. Set up environment variables:
Create a  file in the root folder of the backend and set the following variables:```.env```
```{}
DB_URL = <your_mongodb_connection_string>
```
4. Run the application:
```{}
npm start
```
##   API Endpoints
Here's an overview of the available API endpoints:  
- /auth: Login function by JWT
- /api/users: User creation and management
- /api/group: Group creation and management
- /api/orders: Order creation and management

### auth.js
- Login
    - Using **loginUser()** function
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
- Create a new account :  
    - Using **addUser()** function  
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
- Get user's information :
    - Using **queryUserInfoById()** function
    - Method: GET
    - API: ```http://localhost:3000/api/users/:userId``` 
- Update user's information : 
    - Using **updateUser()** function
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
- Select user by user name
    - Using **queryBasicInfoByName()** function
    - Method: GET
    - API: ```http://localhost:3000/api/users/userinfo/:username```
- Delete a member from family
    - Using **deleteUserFromGroup()** function
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
    - Using **queryGroupByUserid1()** function
    - API: ```localhost:3000/api/users/queryGroupByUserid/:userId```
  
### group.js
- Create a new Group
    - Using **addGroups()** function
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
- Update groupe information
    - Using **updateGroup()** function
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
- Add new member to group
    - Using **InsertUsersInGroupByGroupId()** function
    - Method: POST
    - API: ```http://localhost:3000/api/group/insertUsersInGroupByGroupId```
    - Request body:
    ```{js}
    {
        "username": "mwallis",
        "groupid": {"$oid": "645851feac6c8637635240a2"}
    }
    ```
- Get recent purchases by groupId
    - Using **getRecentPurchasesByGroupId()** function
    - Method: GET
    - API: ```http://localhost:3000/api/group/recentPurchases/:groupId```
- Delete group by groupId
    - Using **deleteGroupById()** function
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
- Add a new order
    - Using **addOrders()** function
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
- Select orders by purchase date
    - Using **queryByDate()** function
    - Method: GET
    - API: ```http://localhost:3000/api/orders/queryByDate/:groupId/:year/:month```
- Select orders by order id
    - Using **queryOrderById()** function
    - Method: GET
    - API: ```http://localhost:3000/api/orders/:orderId```
- Delete bill by id
    - Using **deleteOrderById()** function
    - Method: DELETE
    - API: ```http://localhost:3000/api/orders/delete```
    - Request body:
    ```{js}
    {
        "id":{"$oid": "6458758cd7cb952d83555d2a"}
    }
    ```


## Testing

Testing is divided into two main phases:

### Phase 1: Database Initialization with HBS
In this stage, we set up our test database. This involves the following steps:

1. **Create a `random_Data.hbs` file**: This file will contain the Handlebars template used to generate our test data.

2. **Create a `random_Data.js` file**: This file will run the Handlebars template and populate the database with the generated test data.

3. **Run `random_Data.hbs` and `random_Data.js`**: Execute these scripts to initialize the database with the generated data.

### Phase 2: Testing with Postman
In the second stage, we test each operation using the Postman application. 

1. **Postman Setup**: If you haven't already, download and install Postman on your local machine.

2. **Import the Collection**: Import the Postman collection provided in the repository. This collection contains pre-configured requests for all available API endpoints.

3. **Run the Requests**: For each API endpoint, select the corresponding request in Postman and click "Send". Check the results in the "Body" section of the "Response" pane. Make sure the data returned matches what you expect.

### Example
**Database Initialization with HBS**
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
**Testing with Postman**  
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

Remember to always ensure your server is running before attempting to send requests via Postman.

By following these two phases, you will be able to test the functionality and robustness of the API.

Happy testing!




## Contributors
- Contributor 1: Yuqian Ma (Nefertari710)
- Contributor 2: Zihui Yang (yzhzyyy)
