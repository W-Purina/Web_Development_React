import { Image } from "antd-mobile";
import styles from "./DashboardProfile.module.css";
import testAvatar from "../assets/testAvatar.jpg";

const DashboardProfile = () => {
  return (
    <>
      {/* The profile box */}
      <div className={`${styles.profileBox} relative h-[240px] w-full`}>
        {/* To assist background blur */}
        <div className="absolute inset-0 backdrop-blur-[3px]"></div>
        {/* Avatar and username box */}
        <div className="absolute mt-16 flex w-full pl-5">
          {/* Avatar */}
          <Image
            className=" border-blue h-20 w-20 rounded-full border-8"
            src={testAvatar}
          ></Image>
          {/* Username area */}
          <div className="ml-3 flex flex-grow flex-col justify-center">
            <span className={`${styles.shadowText} mb-1 text-2xl text-white`}>
              Bo Pang
            </span>
            <span className={`${styles.shadowText} text-base text-white`}>
              @ipangbo
            </span>
          </div>
          {/* Total summary */}
          <div className="mr-3 flex flex-col justify-center">
            <span className={`${styles.shadowText} mb-1 text-base text-white`}>
              May, 2023 Total:
            </span>
            <span
              className={`${styles.shadowText} mb-1 text-right text-3xl text-white`}
            >
              $1443
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardProfile;
