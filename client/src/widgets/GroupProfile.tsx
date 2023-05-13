import { useContext } from "react";
import styles from "./DashboardProfile.module.css";
import { GroupsContext } from "../contexts/GroupsContextProvider";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const GroupProfile = () => {
  const { year, month } = useParams();
  const { groupDetails } = useContext(GroupsContext);
  return (
    <>
      {/* The profile box */}
      <div className={`${styles.profileBox} relative h-[240px] w-full`}>
        {/* To assist background blur */}
        <div className="absolute inset-0 backdrop-blur-[3px]"></div>
        {/* Avatar and username box */}
        <div className="absolute mt-12 flex w-full pl-5">
          {/* Username area */}
          <div className="ml-3 flex flex-grow flex-col justify-center">
            <span className={`${styles.shadowText} mb-2 text-2xl text-white`}>
              {groupDetails.groupname}
            </span>
            <span
              className={`${styles.shadowText} text-base text-white`}
              style={{ maxWidth: "13em" }}
            >
              {groupDetails.members.map(obj => obj.username).join(", ")}
            </span>
          </div>
          {/* Total summary */}
          <div className="mr-3 flex flex-col justify-center">
            <span className={`${styles.shadowText} mb-1 text-base text-white`}>
              {dayjs()
                .month(Number(month) - 1)
                .format("MMM")}
              , {dayjs().format("YYYY")} Total:
            </span>
            <span
              className={`${styles.shadowText} mb-1 text-right text-3xl text-white`}
            >
              $
              {groupDetails.orders
                .reduce((total, order) => total + order.totalPrice, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupProfile;
