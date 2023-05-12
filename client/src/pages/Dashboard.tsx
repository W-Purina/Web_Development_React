import { FloatingBubble, NavBar } from "antd-mobile";
import DashboardProfile from "../widgets/DashboardProfile";
import FamilyCardList from "../widgets/FamilyCardList";
import { AddOutline } from "antd-mobile-icons";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GroupsContext } from "../contexts/GroupsContextProvider";

const Dashboard = () => {
  const navigate = useNavigate();
  const { groups, setCurrentGroups } = useContext(GroupsContext);

  useEffect(() => {
    // Test data
    setCurrentGroups([
      {
        groupname: "17A/Columbia Apartment",
        members: [
          "Yuqian Ma",
          "Henry Liu",
          "Shengzhe Liu",
          "Ruiyu Peng",
          "Zihui Yang",
        ],
        currentMonthCost: 410,
      },
      {
        groupname: "1320/Unilodge on Whitaker Pl.",
        members: [
          "Bo Pang",
          "Tianchuan Mi",
          "Bo Li",
          "Tianqi Jiang",
          "Haoru Guan",
        ],
        currentMonthCost: 820,
      },
    ]);
  }, []);
  return (
    <>
      <NavBar backArrow={false}>Dashboard</NavBar>
      <div className={`${styles.dashboard} `}>
        <div className={`${styles.dashboardBG} inset-0 min-h-screen`}>
          <DashboardProfile></DashboardProfile>
          {/* Family list */}
          <FamilyCardList groupsData={groups}></FamilyCardList>
          <FloatingBubble
            style={{
              "--initial-position-bottom": "24px",
              "--initial-position-right": "24px",
              "--edge-distance": "24px",
              "--background": "orange",
            }}
            onClick={() => navigate("/group/addGroup")}
          >
            <AddOutline fontSize={32}></AddOutline>
          </FloatingBubble>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
