import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import UserContextProvider from "./contexts/UserContextProvider";
import GroupsContextProvider from "./contexts/GroupsContextProvider";
import OrdersContextProvider from "./contexts/OrdersContextProvider";

const App = () => {
  return (
    <>
      <OrdersContextProvider>
        <GroupsContextProvider>
          <UserContextProvider>
            <ConfigProvider locale={enUS}>
              <BrowserRouter basename="/">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={<Dashboard></Dashboard>}
                  ></Route>
                  <Route path="/test" element={<UploadPhoto />} />
                  <Route path="/profile" element={<Profile></Profile>} />
                  <Route
                    path="/group/addGroup"
                    element={<AddGroup></AddGroup>}
                  />
                  <Route
                    path="/order/addOrder"
                    element={<AddOrder></AddOrder>}
                  />
                  <Route
                    path="/group/:groupId/:year?/:month?"
                    element={<GroupOrders></GroupOrders>}
                  />
                  <Route
                    path="/order/:orderId"
                    element={<OrderDetails></OrderDetails>}
                  />
                  <Route
                    path="/"
                    element={<Navigate to={"/login"}></Navigate>}
                  />
                </Routes>
              </BrowserRouter>
            </ConfigProvider>
          </UserContextProvider>
        </GroupsContextProvider>
      </OrdersContextProvider>
    </>
  );
};

export default App;
