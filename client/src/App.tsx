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
import UserContextProvider from "./contexts/UserContextProvider";
import GroupsContextProvider from "./contexts/GroupsContextProvider";
import OrdersContextProvider from "./contexts/OrdersContextProvider";
import { PrivateRoute } from "./PrivateRoute";

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
                    element={
                      <PrivateRoute>
                        <Dashboard></Dashboard>
                      </PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/test"
                    element={
                      <PrivateRoute>
                        <UploadPhoto />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile></Profile>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/group/addGroup"
                    element={
                      <PrivateRoute>
                        <AddGroup></AddGroup>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/order/addOrder"
                    element={
                      <PrivateRoute>
                        <AddOrder></AddOrder>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/group/:groupId/:year?/:month?"
                    element={
                      <PrivateRoute>
                        <GroupOrders></GroupOrders>
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/order/:orderId"
                    element={
                      <PrivateRoute>
                        <OrderDetails></OrderDetails>
                      </PrivateRoute>
                    }
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
