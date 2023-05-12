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
- /api/users: User creation and management
- /api/group: Group creation and management
- /api/orders: Order creation and management

### 1. users.js
- Create a new account :  
    - Using **addUser()** function  
    - API: ```localhost:3000/api/users```
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
    - API: ```localhost:3000/api/users/:userId``` 
- Update user's information : 
    - Using **updateUser()** function
    - API: ```localhost:3000/api/users/updateuser```
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
- Login
    - Using **loginUser()** function
    - API: ```localhost:3000/api/users/login```
    - Request body :
    ```{js}
    {
        "email": "travis.porras@citisys.mobi",
        "password": "$2b$10$0TnDSnCCa7sTQZwOxd.4iuO8DUfnLicJ.TsnmDCVtWX8w5oHAff3."
    }
    ```
- Select user by user name
    - Using **queryBasicInfoByName()** function
    - API: ```localhost:3000/api/users/userinfo/:username```
- Delete a member from family
    - Using **deleteUserFromGroup()** function
    - API: ```localhost:3000/api/users/delete```
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
  
### 2. group.js
- Create a new Group
    - Using **addGroups()** function
    - API: ```localhost:3000/api/group```
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
    - API: ```localhost:3000/api/group/:groupId```
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
    - API: ```localhost:3000/api/groups/insertUsersInGroupByGroupId```
    - Request body:
    ```{js}
    {
        "username": "mwallis",
        "groupid": {"$oid": "645851feac6c8637635240a2"}
    }
    ```
- Get recent purchases by groupId
    - Using **getRecentPurchasesByGroupId()** function
    - API: ```localhost:3000/api/groups/recentPurchases/:groupId```

  
### 3. orders.js
- Add a new order
    - Using **addOrders()** function
    - API: ```localhost:3000/api/orders/addNewOrders```
    - Request body:
    ```{js}
    {
        "storename": "countdown",
        "group": {"$oid": "6456eb083d477a819c2fa1b6"},
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
    - API: ```localhost:3000/api/orders/queryByDate```
    - Request body:
    ```{js}
    {
        "year": "2021",
        "month": "12"
    }  
    ```
- Delete bill by id
    - Using **deleteOrderById()** function
    - API: ```localhost:3000/api/orders/delete```
    - Request body:
    ```{js}
    {
        "id":{"$oid": "6458758cd7cb952d83555d2a"}
    }
    ```


##  Testing


## Contributors
- Contributor 1: Yuqian Ma (Nefertari710)
- Contributor 2: Zihui Yang (yzhzyyy)