import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  DatePicker,
  FloatingBubble,
  NavBar,
  Popup,
  Space,
  Toast,
} from "antd-mobile";

import {
  AddOutline,
  AppstoreOutline,
  CalendarOutline,
} from "antd-mobile-icons";
import styles from "./Dashboard.module.css";
import GroupProfile from "../widgets/GroupProfile";
import OrderCardList from "../widgets/OrderCardList";

const Group = () => {
  const { groupId, year, month } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // If year and month not provided, use current date.
    if (!year || !month) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // Month starts from 0

      navigate(`/group/${groupId}/${currentYear}/${currentMonth}`);
    }
  }, [groupId, year, month, navigate]);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [adminPopupVisible, setAdminPopupVisible] = useState(false);

  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ "--gap": "16px" }}>
        <AppstoreOutline
          onClick={() => setAdminPopupVisible(true)}
        ></AppstoreOutline>
        <CalendarOutline onClick={() => setDatePickerVisible(true)} />
      </Space>
    </div>
  );

  return (
    <>
      <NavBar onBack={() => navigate("/dashboard")} right={right}>
        Group Orders
      </NavBar>
      <div className={`${styles.dashboard}`}>
        <div className={`${styles.dashboardBG} inset-0  min-h-screen`}>
          <GroupProfile></GroupProfile>
          <OrderCardList></OrderCardList>
          <FloatingBubble
            style={{
              "--initial-position-bottom": "24px",
              "--initial-position-right": "24px",
              "--edge-distance": "24px",
              "--background": "orange",
            }}
            onClick={() => navigate("/order/addOrder")}
          >
            <AddOutline fontSize={32}></AddOutline>
          </FloatingBubble>
        </div>
      </div>
      <DatePicker
        visible={datePickerVisible}
        onClose={() => {
          setDatePickerVisible(false);
        }}
        precision="month"
        onConfirm={val => {
          Toast.show(val.toString());
        }}
      />
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
                  Invite a Member
                </Button>
                <Button block color="primary" size="large" fill="outline">
                  Modify Group Name
                </Button>
                <span className="my-20 text-sm text-gray-400">
                  Delete a Member:
                </span>
                <Space wrap>
                  <Button
                    color="danger"
                    size="mini"
                    fill="outline"
                    shape="rounded"
                  >
                    YuQian Ma
                  </Button>
                  <Button
                    color="danger"
                    size="mini"
                    fill="outline"
                    shape="rounded"
                  >
                    Henry Liu
                  </Button>
                  <Button
                    color="danger"
                    size="mini"
                    fill="outline"
                    shape="rounded"
                  >
                    Henry Liu
                  </Button>
                  <Button
                    color="danger"
                    size="mini"
                    fill="outline"
                    shape="rounded"
                  >
                    Henry Liu
                  </Button>
                  <Button
                    color="danger"
                    size="mini"
                    fill="outline"
                    shape="rounded"
                  >
                    Henry Liu
                  </Button>
                </Space>
                <br />
                <Button block color="danger" size="large" fill="outline">
                  DELETE GROUP
                </Button>
              </Space>
            </div>
          </>
        }
      </Popup>
    </>
  );
};

export default Group;
