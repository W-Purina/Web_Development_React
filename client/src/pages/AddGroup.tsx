import {
  Button,
  Dialog,
  Form,
  Input,
  NavBar,
  Space,
  TextArea,
  Toast,
} from "antd-mobile";
import { useNavigate } from "react-router-dom";
import http from "../http/http";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

const AddGroup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user } = useContext(UserContext);

  const onSubmit = async () => {
    const formData = form.getFieldsValue();
    try {
      await http.post("/api/group", {
        ...formData,
        createdBy: {
          $oid: user._id,
        },
      });
    } catch {
      Toast.show("Create Group Error");
    }
  };
  return (
    <>
      <NavBar onBack={() => navigate(-1)}>Add Group</NavBar>
      <Form
        form={form}
        onFinish={onSubmit}
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
        <Form.Item
          name="groupname"
          label="Group Name"
          rules={[{ required: true, message: "required" }]}
        >
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
