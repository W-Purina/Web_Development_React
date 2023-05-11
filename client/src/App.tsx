import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadPhoto from "./pages/UploadPhoto";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/test" element={<UploadPhoto />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
