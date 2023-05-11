import { useState } from "react";
import { Button, ImageUploader, Toast } from "antd-mobile";
import { ImageUploadItem } from "antd-mobile/es/components/image-uploader";

const UploadPhoto = () => {
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
        // 在此处处理识别结果，如显示在页面上或发送到服务器
        console.log(fullTextAnnotation.text);
      } else {
        Toast.show({
          content: "Unable to recognize the text in the picture",
          icon: "error",
          duration: 3000,
        });
        return;
      }
    } catch (error) {
      console.error("Error detecting text:", error);
      Toast.show({
        content: "Recognition error, please try again",
        icon: "error",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <ImageUploader
        value={fileList}
        onChange={setFileList}
        upload={uploadImage}
        maxCount={1}
        style={{ "--cell-size": "190px" }}
      />
      <Button onClick={onSubmit}>Submit</Button>
    </>
  );
};

export default UploadPhoto;
