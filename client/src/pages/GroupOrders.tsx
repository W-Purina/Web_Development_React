import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../http/http";
import {
  Button,
  DatePicker,
  FloatingBubble,
  Form,
  Input,
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
import { GroupsContext } from "../contexts/GroupsContextProvider";

const GroupOrders = () => {
  const { groupId, year, month } = useParams();
  const navigate = useNavigate();
  const { groupDetails, setCurrentGroupDetails } = useContext(GroupsContext);

  useEffect(() => {
    // If year and month not provided, use current date.
    if (!year || !month) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // Month starts from 0

      navigate(`/group/${groupId}/${currentYear}/${currentMonth}`);
    }

    // Test data
    // setCurrentGroupDetails({
    //   _id: "010101",
    //   groupname: "1320/Unilodge on Whitaker Pl.",
    //   members: [
    //     "Bo Pang",
    //     "Tianchuan Mi",
    //     "Bo Li",
    //     "Tianqi Jiang",
    //     "Haoru Guan",
    //   ],
    //   createdBy: { $oid: "1" },
    //   currentMonthCost: 1235,
    //   orders: [
    //     {
    //       _id: "333",
    //       storename: "Countdown",
    //       createdBy: "Bo Pang",
    //       purchaseDate: new Date().toString(),
    //       totalPrice: 25,
    //     },
    //     {
    //       _id: "555",
    //       storename: "New World",
    //       createdBy: "Bo Li",
    //       purchaseDate: new Date().toString(),
    //       totalPrice: 40,
    //     },
    //     {
    //       _id: "333",
    //       storename: "Warehouse",
    //       createdBy: "Haoru Guan",
    //       purchaseDate: new Date().toString(),
    //       totalPrice: 125,
    //     },
    //   ],
    // });
    getGroupDetails();
  }, [groupId, year, month, navigate]);

  const getGroupDetails = async () => {
    try {
      const resp = await http.get(
        `/api/orders/queryByDate/${groupId}?year=${year}&month=${month}`
      );
    } catch {
      Toast.show("No data in this month");
    }
  };

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [adminPopupVisible, setAdminPopupVisible] = useState(false);

  const [invitedMemberIdentifier, setInvitedMemberIdentifier] = useState("");
  const [tempGroupName, setTempGroupName] = useState("");

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
          const now = new Date();
          if (
            val.getFullYear().toString() +
              val.getMonth().toString().padStart(2, "0") >
            now.getFullYear().toString() +
              now.getMonth().toString().padStart(2, "0")
          )
            Toast.show("It's too early");
          else
            navigate(
              `/group/${groupDetails._id}/${val.getFullYear().toString()}/${(
                val.getMonth() + 1
              ).toString()}`
            );
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
      >
        {
          <>
            <div className="mt-4 flex justify-center text-gray-400">
              <span>You can perform the following actions:</span>
            </div>
            <div className="p-5">
              <Space direction="vertical" block>
                <Form
                  layout="horizontal"
                  footer={
                    <Button
                      block
                      color="primary"
                      size="middle"
                      fill="outline"
                      onClick={() => console.log(invitedMemberIdentifier)}
                    >
                      Invite a Member
                    </Button>
                  }
                >
                  <Form.Item name="identifier" label="Identifier">
                    <Input
                      placeholder="Email or Username"
                      onChange={setInvitedMemberIdentifier}
                    ></Input>
                  </Form.Item>
                </Form>
                <Form
                  layout="horizontal"
                  footer={
                    <Button
                      block
                      color="primary"
                      size="middle"
                      fill="outline"
                      onClick={() => console.log(tempGroupName)}
                    >
                      Modify Group Name
                    </Button>
                  }
                >
                  <Form.Item name="groupName" label="New Name">
                    <Input
                      placeholder="Enter new name here"
                      onChange={setTempGroupName}
                    ></Input>
                  </Form.Item>
                </Form>

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

export default GroupOrders;
