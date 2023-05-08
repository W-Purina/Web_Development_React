import { useNavigate } from "react-router-dom";
import { Button, Input, List, Space } from "antd-mobile";
import styles from "./Login.module.css"

const Login = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        //后端登录验证逻辑
        navigate("/dashboard")
    }

    const handleRegister = () => {
        //点击注册按钮直接转到注册页面
        navigate("/register")
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.border}>
                    <form className={styles.form}>
                        <List header={<div className={styles.listHeader}> Login</div>}>
                            <List.Item extra={<Input type="text" className={styles.inputItem} placeholder=" username/email" />} />
                            <List.Item extra={<Input type="password" className={styles.inputItem} placeholder="password" />} />
                        </List>
                        <Space />
                        <Button type="submit" onClick={handleLogin} className={styles.button}>Login</Button>
                        <Space />
                        <Button type="reset" onClick={handleRegister} className={styles.button}>Register</Button>
                        <Space />
                    </form>
                </div>
            </div>
        </>
    );
};
export default Login;