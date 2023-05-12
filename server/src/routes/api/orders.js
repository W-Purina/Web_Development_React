import express from "express";
import mongoose from "mongoose";
// 此处导入用到的函数
import {addOrders, queryByDate, deleteOrderById, queryOrderById} from '../../allData/app'; 

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

// 添加 order
// 请求 api: " localhost:3000/api/orders/addNewOrders "
// 请求例子：
// {
//   "storename": "countdown",
//   "group": {"$oid": "645db5c83b1d552ae2604417"},
//   "createdBy":{"$oid": "645db5c83b1d552ae2604408"},
//   "items": [
//       {
//           "productname": "milk",
//           "unitprice": 83,
//           "amount": 3,
//           "productprice": 99
//       },
//       {
//           "productname": "apple",
//           "unitprice": 77,
//           "amount": 1,
//           "productprice": 58
//       },
//       {
//           "productname": "banana",
//           "unitprice": 2,
//           "amount": 10
//       },
//       {
//           "productname": "book",
//           "unitprice": 58,
//           "amount": 10,
//           "productprice": 30
//       }
//   ],
//   "purchaseDate": {"$date": "2021-08-22T13:13:34.000Z"}
// }
// 通过测试 ( •̀ ω •́ )y
router.post('/addNewOrders', async(req, res) => {
    const rawData = req.body;
    
    rawData.group = new mongoose.Types.ObjectId(rawData.group.$oid);
    rawData.purchaseDate = new Date(rawData.purchaseDate.$date);
    rawData.createdBy = new mongoose.Types.ObjectId(rawData.createdBy.$oid);
    const newOrder = await addOrders(rawData);

    if (newOrder) return res.status(HTTP_CREATED)
    .header('Location', `/api/orders/${newOrder._id}`).json(newOrder);

    return res.sendStatus(422);
})

// 按照账单id找详细内容
// 请求api：localhost:3000/api/orders/6458758cd7cb952d83555d62
// 通过测试 ( •̀ ω •́ )y
router.get('/:orderId', async(req, res) => {
  const orderId = req.params.orderId;
  const selectedOrder = await queryOrderById(orderId);
  if (selectedOrder){
    return res.status(200).json(selectedOrder);
  }
  else{
    return res.sendStatus(404);
  }
})


// 按照日期查找账单
// 请求例子：“ localhost:3000/api/orders/queryByDate/:groupId ”
// 请求 body:
// {
//     "year": "2021",
//     "month": "03"
// }
// 通过测试 ( •̀ ω •́ )y
router.get('/queryByDate/:groupId', async (req, res) => {
    const groupId = req.params.groupId;
    const {year, month} = req.body;
    const selectedOrder = await queryByDate(groupId, year, month);
    if ( selectedOrder ) return res.json(selectedOrder)
    return res.sendStatus(HTTP_NOT_FOUND);
})

// delete bill
// 请求 api：‘ localhost:3000/api/orders/delete ’\
// {
//     "id":{
//         "$oid": "6458758cd7cb952d83555d2a"
//     }
// }
// 通过测试 ( •̀ ω •́ )y
router.delete('/delete', async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.body.id.$oid);

    const result = await deleteOrderById(id);
  
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
});

export default router;