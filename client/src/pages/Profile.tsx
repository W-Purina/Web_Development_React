import {
  Button,
  DatePicker,
  DatePickerRef,
  Form,
  Input,
  NavBar,
  Space,
} from "antd-mobile";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { RefObject } from "react";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar onBack={() => navigate("/dashboard")}>Profile</NavBar>
      <Form
        layout="horizontal"
        footer={
          <>
            <Space direction="vertical" block>
              <Button block type="submit" color="primary" size="large">
                Update Profile
              </Button>
              <Button block color="danger" size="large" fill="outline">
                Log Out
              </Button>
            </Space>
          </>
        }
        initialValues={{
          username: "@" + "ipangbo",
          email: "i@ipangbo.cn",
          firstName: "Bo",
          lastName: "Pang",
          dateOfBirth: new Date(),
        }}
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
