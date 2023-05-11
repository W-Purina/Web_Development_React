import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadPhoto from "./pages/UploadPhoto";
import GroupOrders from "./pages/GroupOrders";
import Profile from "./pages/Profile";
import { ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";
import OrderDetails from "./pages/OrderDetails";
import AddGroup from "./pages/AddGroup";
import AddOrder from "./pages/AddOrder";

const App = () => {
  return (
    <>
      <ConfigProvider locale={enUS}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route path="/test" element={<UploadPhoto />} />
            <Route path="/profile" element={<Profile></Profile>} />
            <Route path="/group/addGroup" element={<AddGroup></AddGroup>} />
            <Route path="/order/addOrder" element={<AddOrder></AddOrder>} />
            <Route
              path="/group/:groupId/:year?/:month?"
              element={<GroupOrders></GroupOrders>}
            />
            <Route
              path="/order/:orderId"
              element={<OrderDetails></OrderDetails>}
            />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
};

export default App;
