import { useNavigate, useParams } from "react-router-dom";
import { Button, NavBar, Popup, Space } from "antd-mobile";

import styles from "./Dashboard.module.css";

import OrderProfile from "../widgets/OrderProfile";
import ItemCardList from "../widgets/ItemCardList";
import { AppstoreOutline } from "antd-mobile-icons";
import { useContext, useEffect, useState } from "react";
import { OrdersContext } from "../contexts/OrdersContextProvider";

const OrderDetails = () => {
  const navigate = useNavigate();

  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ "--gap": "16px" }}>
        <AppstoreOutline
          onClick={() => setAdminPopupVisible(true)}
        ></AppstoreOutline>
      </Space>
    </div>
  );
  const [adminPopupVisible, setAdminPopupVisible] = useState(false);

  const { orderId } = useParams();

  const { orderDetails, setCurrentOrderDetails } = useContext(OrdersContext);

  useEffect(() => {
    // setCurrentOrderDetails({
    //   _id: "777",
    //   storename: "Warehouse",
    //   purchaseDate: new Date().toString(),
    //   totalPrice: 23.81,
    //   createdBy: "Bo Li",
    //   items: [
    //     {
    //       productname: "Autie Dai's Chive Pork Dumplings",
    //       amount: 3,
    //       productprice: 33.3,
    //     },
    //     {
    //       productname: "Tegel California Chicken Portrait",
    //       amount: 1,
    //       productprice: 15.06,
    //     },
    //     {
    //       productname: "Living & Co Air Fryer",
    //       amount: 1,
    //       productprice: 79.9,
    //     },
    //   ],
    // });
  }, []);

  return (
    <>
      <NavBar onBack={() => navigate(-1)} right={right}>
        Order Details
      </NavBar>
      <div className={`${styles.dashboard}`}>
        <div className={`${styles.dashboardBG} inset-0  min-h-screen`}>
          <OrderProfile></OrderProfile>
          <ItemCardList></ItemCardList>
        </div>
      </div>

      <Popup
        visible={adminPopupVisible}
        onMaskClick={() => {
          setAdminPopupVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          minHeight: "40vh",
        }}
        showCloseButton
      >
        {
          <>
            <div className="mt-4 flex justify-center text-gray-400">
              <span>You can perform the following actions:</span>
            </div>
            <div className="p-5">
              <Space direction="vertical" block>
                <Button block color="primary" size="large" fill="outline">
                  Modify the Order
                </Button>
                <Button block color="danger" size="large" fill="outline">
                  Delete the Order
                </Button>
              </Space>
            </div>
            <div className="mt-4 flex justify-center text-gray-400">
              <span>Order ID: {orderId}</span>
            </div>
          </>
        }
      </Popup>
    </>
  );
};

export default OrderDetails;
