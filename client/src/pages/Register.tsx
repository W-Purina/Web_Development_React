import { useNavigate } from "react-router-dom";
import { Button, Form, Input, List, Space } from "antd-mobile";
import styles from "./Login.module.css";
import http from "../http/http";

const Register = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const handleRegister = async () => {
    http.post("/api/users/create-user-without-groups", form.getFieldsValue());
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.border}>
          <div className={styles.listHeader}> Notable Nightingales</div>
          <Form layout="horizontal" form={form}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "required" }]}
            >
              <Input placeholder="abc123@aucklanduni.ac.nz" clearable />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "required" }]}
            >
              <Input placeholder="abc123" clearable />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "required" }]}
            >
              <Input placeholder="******" clearable type="password" />
            </Form.Item>
            <Form.Item
              label="Ensure Password"
              name="password2"
              rules={[{ required: true, message: "required" }]}
            >
              <Input placeholder="******" clearable type="password" />
            </Form.Item>
            <Space direction="vertical" block className=" mt-5">
              <Button
                block
                color="primary"
                size="large"
                type="submit"
                onClick={handleRegister}
              >
                Register
              </Button>
              <Button
                block
                color="primary"
                size="large"
                fill="outline"
                onClick={handleLogin}
              >
                Have an account? Login
              </Button>
            </Space>{" "}
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
