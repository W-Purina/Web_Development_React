import { useNavigate, useParams } from "react-router-dom";
import { Button, NavBar, Popup, Space } from "antd-mobile";

import styles from "./Dashboard.module.css";

import OrderProfile from "../widgets/OrderProfile";
import ItemCardList from "../widgets/ItemCardList";
import { AppstoreOutline } from "antd-mobile-icons";
import { useState } from "react";

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

  return (
    <>
      <NavBar onBack={() => navigate(-1)} right={right}>
        Order Details
      </NavBar>
      <div className={`${styles.dashboard} relative h-full`}>
        <div className={`${styles.dashboardBG} absolute inset-0`}>
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
