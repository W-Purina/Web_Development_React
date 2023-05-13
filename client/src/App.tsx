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
import { PrivateRoute, PrivateRouteProps } from "./PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContextProvider";

const App = () => {
  const defaultPrivateRouteProps: Omit<PrivateRouteProps, "outlet"> = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    authenticationPath: "/login",
  };
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
                      <PrivateRoute
                        {...defaultPrivateRouteProps}
                        outlet={<Dashboard></Dashboard>}
                      ></PrivateRoute>
                    }
                  ></Route>
                  <Route
                    path="/test"
                    element={
                      <PrivateRoute
                        {...defaultPrivateRouteProps}
                        outlet={<UploadPhoto />}
                      ></PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute
                        {...defaultPrivateRouteProps}
                        outlet={<Profile></Profile>}
                      ></PrivateRoute>
                    }
                  />
                  <Route
                    path="/group/addGroup"
                    element={
                      <PrivateRoute
                        {...defaultPrivateRouteProps}
                        outlet={<AddGroup></AddGroup>}
                      ></PrivateRoute>
                    }
                  />
                  <Route
                    path="/order/addOrder"
                    element={
                      <PrivateRoute
                        {...defaultPrivateRouteProps}
                        outlet={<AddOrder></AddOrder>}
                      ></PrivateRoute>
                    }
                  />
                  <Route
                    path="/group/:groupId/:year?/:month?"
                    element={
                      <PrivateRoute
                        {...defaultPrivateRouteProps}
                        outlet={<GroupOrders></GroupOrders>}
                      ></PrivateRoute>
                    }
                  />
                  <Route
                    path="/order/:orderId"
                    element={
                      <PrivateRoute
                        {...defaultPrivateRouteProps}
                        outlet={<OrderDetails></OrderDetails>}
                      ></PrivateRoute>
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute
                        {...defaultPrivateRouteProps}
                        outlet={<UploadPhoto />}
                      >
                        <Navigate to={"/login"}></Navigate>
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
