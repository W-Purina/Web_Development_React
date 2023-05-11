import { useNavigate } from "react-router-dom";
import { Button, Form, Input, List, Space } from "antd-mobile";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    //后端登录验证逻辑
    navigate("/dashboard");
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
          <Form layout="horizontal">
            <Form.Item label="Username" name="username">
              <Input placeholder="abc123@aucklanduni.ac.nz" clearable />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input placeholder="******" clearable type="password" />
            </Form.Item>
          </Form>
          <Space direction="vertical" block className=" mt-5">
            <Button block color="primary" size="large" onClick={handleLogin}>
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
        </div>
      </div>
    </>
  );
};
export default Login;
