import { useContext } from "react";
import styles from "./DashboardProfile.module.css";
import { GroupsContext } from "../contexts/GroupsContextProvider";
import dayjs from "dayjs";

const GroupProfile = () => {
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
              {groupDetails.members.join(", ")}
            </span>
          </div>
          {/* Total summary */}
          <div className="mr-3 flex flex-col justify-center">
            <span className={`${styles.shadowText} mb-1 text-base text-white`}>
              {dayjs().format("MMM")}, {dayjs().format("YYYY")} Total:
            </span>
            <span
              className={`${styles.shadowText} mb-1 text-right text-3xl text-white`}
            >
              ${groupDetails.currentMonthCost}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupProfile;
