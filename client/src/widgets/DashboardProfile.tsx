import { Image } from "antd-mobile";
import styles from "./DashboardProfile.module.css";
import testAvatar from "../assets/testAvatar.jpg";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { GroupsContext } from "../contexts/GroupsContextProvider";
import dayjs from "dayjs";

const DashboardProfile = () => {
  const { user } = useContext(UserContext);
  const { groups } = useContext(GroupsContext);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(
      groups.reduce((total, group) => total + group.currentMonthCost, 0)
    );
  }, [groups]);
  return (
    <>
      {/* The profile box */}
      <div className={`${styles.profileBox} relative h-[240px] w-full`}>
        {/* To assist background blur */}
        <div className="absolute inset-0 backdrop-blur-[3px]"></div>
        {/* Avatar and username box */}
        <div className="absolute mt-16 flex w-full pl-5">
          <Link to={"/profile"} className="grow">
            <div className="flex">
              {/* Avatar */}
              <Image
                className=" border-blue h-20 w-20 rounded-full border-8"
                src={testAvatar}
              ></Image>
              {/* Username area */}
              <div className="ml-3 flex flex-grow flex-col justify-center">
                <span
                  className={`${styles.shadowText} mb-1 text-2xl text-white`}
                >
                  {user.firstName + " " + user.lastName}
                </span>
                <span className={`${styles.shadowText} text-base text-white`}>
                  @{user.username}
                </span>
              </div>
            </div>
          </Link>
          {/* Total summary */}
          <div className="mr-3 flex flex-col justify-center">
            <span className={`${styles.shadowText} mb-1 text-base text-white`}>
              {dayjs().format("MMM")}, {dayjs().format("YYYY")} Total:
            </span>
            <span
              className={`${styles.shadowText} mb-1 text-right text-3xl text-white`}
            >
              ${total}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardProfile;
