import {
  Button,
  DatePicker,
  DatePickerRef,
  Form,
  Input,
  NavBar,
  Space,
  Toast,
} from "antd-mobile";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { RefObject, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import http from "../http/http";

const Profile = () => {
  const navigate = useNavigate();

  const { user, setCurrentUser } = useContext(UserContext);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(user);
  });

  const onSubmit = async () => {
    const formData = form.getFieldsValue();
    delete formData.username;
    try {
      await http.put("/api/users/updateuser", {
        _id: {
          $oid: "",
        },
        ...formData,
      });
    } catch {
      Toast.show("Update User Error. Please check if your Email is valid.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <NavBar onBack={() => navigate("/dashboard")}>Profile</NavBar>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onSubmit}
        footer={
          <>
            <Space direction="vertical" block>
              <Button block type="submit" color="primary" size="large">
                Update Profile
              </Button>
              <Button
                block
                color="danger"
                size="large"
                fill="outline"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Space>
          </>
        }
        initialValues={{}}
      >
        <Form.Header>Modify your profile</Form.Header>
        <Form.Item name="username" label="Username" disabled required>
          <Input readOnly />
        </Form.Item>
        <Form.Item name="email" label="E-mail" required>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" />
        </Form.Item>
        <Form.Item name="firstName" label="First Name" required>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" required>
          <Input />
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          label="Birthday"
          trigger="onConfirm"
          onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
            datePickerRef.current?.open();
          }}
        >
          <DatePicker>
            {value =>
              value ? dayjs(value).format("DD/MM/YYYY") : "Pick a date"
            }
          </DatePicker>
        </Form.Item>
      </Form>
    </>
  );
};

export default Profile;
