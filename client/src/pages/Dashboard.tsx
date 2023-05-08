import { FloatingBubble } from "antd-mobile";
import DashboardProfile from "../widgets/DashboardProfile";
import FamilyCardList from "../widgets/FamilyCardList";
import { AddOutline } from "antd-mobile-icons";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <>
      <div className={`${styles.dashboard} relative -z-20 h-full`}>
        <div className={`${styles.dashboardBG} absolute inset-0 -z-10`}></div>
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
        >
          <AddOutline fontSize={32}></AddOutline>
        </FloatingBubble>
      </div>
    </>
  );
};

export default Dashboard;
