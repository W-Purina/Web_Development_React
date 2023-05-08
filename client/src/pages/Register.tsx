import { useNavigate } from "react-router-dom";
import { Button, Input, List, Space } from "antd-mobile";
import styles from "./Login.module.css"

const Register = () => {

    const navigate = useNavigate();

    const handleLogin = () => {

        navigate("/")
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.border}>
                    <form className={styles.form}>
                        <List header={<div className={styles.listHeader}> Login</div>}>
                            <List.Item extra={<Input type="text" className={styles.inputItem} placeholder=" email" />} />
                            <List.Item extra={<Input type="text" className={styles.inputItem} placeholder=" username" />} />
                            <List.Item extra={<Input type="text" className={styles.inputItem} placeholder=" password" />} />
                            <List.Item extra={<Input type="password" className={styles.inputItem} placeholder="ensure password" />} />
                        </List>
                        <Space />
                        <Button type="submit" className={styles.button}>Submit</Button>
                        <Button type="reset" onClick={handleLogin} className={styles.button}>Login</Button>
                        <Space />
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;