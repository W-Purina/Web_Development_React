import { Button, Form, Input, NavBar, Space, TextArea } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const AddGroup = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar onBack={() => navigate(-1)}>Add Group</NavBar>
      <Form
        layout="horizontal"
        footer={
          <>
            <Space direction="vertical" block>
              <Button block type="submit" color="primary" size="large">
                Add Group{" "}
              </Button>
            </Space>
          </>
        }
        initialValues={{}}
      >
        <Form.Header>
          You will be the administrator of this group. And has the highest
          authority over the group.
        </Form.Header>
        <Form.Item name="groupname" label="Group Name" required>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea />
        </Form.Item>
      </Form>
    </>
  );
};

export default AddGroup;
