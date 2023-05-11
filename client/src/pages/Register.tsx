import { useNavigate } from "react-router-dom";
import { Button, Form, Input, List, Space } from "antd-mobile";
import styles from "./Login.module.css";

const Register = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.border}>
          <div className={styles.listHeader}> Notable Nightingales</div>
          <Form layout="horizontal">
            <Form.Item label="Email" name="email">
              <Input placeholder="abc123@aucklanduni.ac.nz" clearable />
            </Form.Item>
            <Form.Item label="Username" name="username">
              <Input placeholder="abc123" clearable />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input placeholder="******" clearable type="password" />
            </Form.Item>
            <Form.Item label="Ensure Password" name="password2">
              <Input placeholder="******" clearable type="password" />
            </Form.Item>
          </Form>
          <Space direction="vertical" block className=" mt-5">
            <Button block color="primary" size="large">
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
          </Space>
        </div>
      </div>
    </>
  );
};

export default Register;
