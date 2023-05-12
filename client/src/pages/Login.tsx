import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, List, Space, Toast } from "antd-mobile";
import styles from "./Login.module.css";
import http from "../http/http";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = async () => {
    const loginForm = form.getFieldsValue();
    if (loginForm.identifier && loginForm.password) {
      try {
        const resp = await http.post("/auth/login", loginForm);
        navigate("/dashboard");
      } catch {
        Toast.show("Invalid identifier or password");
      }
    }
  };

  const handleRegister = () => {
    //点击注册按钮直接转到注册页面
    navigate("/register");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.border}>
          <div className={styles.listHeader}> Notable Nightingales</div>
          <Form layout="horizontal" form={form}>
            <Form.Item
              label="Username"
              name="identifier"
              rules={[{ required: true, message: "required" }]}
            >
              <Input placeholder="abc123@aucklanduni.ac.nz" clearable />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "required" }]}
            >
              <Input placeholder="******" clearable type="password" />
            </Form.Item>

            <Space direction="vertical" block className=" mt-5">
              <Button
                block
                color="primary"
                size="large"
                onClick={handleLogin}
                type="submit"
              >
                Login
              </Button>
              <Button
                block
                color="primary"
                size="large"
                fill="outline"
                onClick={handleRegister}
              >
                No account? Register
              </Button>
            </Space>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
