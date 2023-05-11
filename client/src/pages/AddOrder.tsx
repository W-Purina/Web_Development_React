import { Button, Form, Input, NavBar, Space, TextArea } from "antd-mobile";
import { AddCircleOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ImageUploader, Toast } from "antd-mobile";
import { ImageUploadItem } from "antd-mobile/es/components/image-uploader";
import { Configuration, OpenAIApi } from "openai";

interface FieldType {
  storename: string;
  totalPrice: number;
  items: {
    productname: string;
    amount: number;
    productprice: number;
  }[];
}

const AddOrder = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm<FieldType>();

  const getGPTIdentificationResp = async (receipt: string) => {
    console.log(receipt);

    // ChatGPT Configuration
    const configuration = new Configuration({
      apiKey: "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",
    });
    delete configuration.baseOptions.headers["User-Agent"];
    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        'Below is a receipt. Please Identify the name, amount, and total price of each item. Return the value in JSON. You should return an array of objects that only have these 3 attributes: "productname", "amount", and "productprice". Remember to obtain quotes for every attribute name. If you cannot see the amount, you should make it the default value 1. You don\'t need to send any extra messages.\n' +
        receipt,
      temperature: 0.7,
      max_tokens: 3042,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    if (response.status === 200 && response.data.choices[0].text) {
      console.log(response.data.choices[0].text.trim());

      const resJson = await JSON.parse(response.data.choices[0].text.trim());
      console.log(resJson);
      return resJson;
    } else {
      Toast.show({
        content: "GPT Error",
        icon: "error",
        duration: 3000,
      });
    }
  };

  // Upload Photo Logic Start:
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);

  const uploadImage = async (file: File): Promise<ImageUploadItem> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve({ url: base64data });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async () => {
    if (fileList.length === 0) {
      Toast.show({
        content: "You havn't upload a pic",
        icon: "error",
        duration: 3000,
      });
      return;
    }

    Toast.show({
      content: "Identifying...",
      duration: 0,
      icon: "loading",
    });

    const apiKey = "AIzaSyCl7pXqIlOKIZ8W4T6aQsqI0STtHSyZ140";
    const base64Image = fileList[0].url.split("base64,")[1];
    const image = { content: base64Image };

    const requestQptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            image,
            features: [
              {
                type: "TEXT_DETECTION",
              },
            ],
          },
        ],
      }),
    };

    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        requestQptions
      );

      const result = await response.json();
      const fullTextAnnotation = result.responses[0].fullTextAnnotation;
      if (fullTextAnnotation) {
        const resJSON = await getGPTIdentificationResp(fullTextAnnotation.text);
        Toast.clear();
        form.setFieldValue("items", resJSON);
        console.log(form.getFieldsValue(true));
      } else {
        Toast.clear();
        Toast.show({
          content: "Unable to recognize the text in the picture",
          icon: "error",
          duration: 3000,
        });
        return;
      }
    } catch (error) {
      Toast.clear();
      console.error("Error detecting text:", error);
      Toast.show({
        content: "Recognition error, please try again",
        icon: "error",
        duration: 3000,
      });
    }
  };
  // Upload Photo Logic Start end
  return (
    <>
      <NavBar onBack={() => navigate(-1)}>Add Order</NavBar>
      <Form
        form={form}
        layout="horizontal"
        footer={
          <>
            <Space direction="vertical" block>
              <Button block type="submit" color="primary" size="large">
                Add Order
              </Button>
            </Space>
          </>
        }
        initialValues={{}}
      >
        <Form.Header>You will add an order to group: Family Name</Form.Header>
        <Form.Item
          name="storename"
          label="Store"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="totalPrice"
          label="Total Price"
          rules={[
            {
              pattern: /^\d+(\.\d{1,2})?$/,
              message: "Please input a valid price",
            },
            { required: true, message: "Required" },
          ]}
        >
          <Input />
        </Form.Item>
        <div className="adm-list-header">
          You could either let ChatGPT identify your reciept
        </div>
        <Space
          direction="vertical"
          block
          className="my-3 flex flex-col items-center"
        >
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={uploadImage}
            maxCount={1}
            style={{ "--cell-size": "190px" }}
            className=" block "
          />
          <Button onClick={onSubmit} color="primary" fill="outline">
            Identify
          </Button>
        </Space>

        <div className="adm-list-header">Or modify/add items manually</div>
        <Form.Array
          name="items"
          onAdd={operation => operation.add({})}
          renderAdd={() => (
            <span>
              <AddCircleOutline /> Add New Item
            </span>
          )}
          renderHeader={({ index }, { remove }) => (
            <>
              <span>#{index + 1}</span>
              <a onClick={() => remove(index)} style={{ float: "right" }}>
                Delete
              </a>
            </>
          )}
        >
          {fields =>
            fields.map(({ index }) => (
              <>
                <Form.Item
                  name={[index, "productname"]}
                  label="Name"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[index, "amount"]}
                  label="Amount"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[index, "productprice"]}
                  label="Total Price"
                  rules={[
                    { required: true, message: "Required" },
                    {
                      pattern: /^\d+(\.\d{1,2})?$/,
                      message: "Please input a valid price",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
            ))
          }
        </Form.Array>
      </Form>
    </>
  );
};

export default AddOrder;
