import { FloatingBubble, NavBar } from "antd-mobile";
import DashboardProfile from "../widgets/DashboardProfile";
import FamilyCardList from "../widgets/FamilyCardList";
import { AddOutline } from "antd-mobile-icons";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar backArrow={false}>Dashboard</NavBar>
      <div className={`${styles.dashboard} relative h-full`}>
        <div className={`${styles.dashboardBG} absolute inset-0`}>
          <DashboardProfile></DashboardProfile>
          {/* Family list */}
          <FamilyCardList></FamilyCardList>
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
