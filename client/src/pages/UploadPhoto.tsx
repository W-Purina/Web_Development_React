import { useState } from 'react';
import { Button, ImageUploader, Toast } from 'antd-mobile';
import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import { ImageAnnotatorClient } from '@google-cloud/vision/build/src/browser/vision-client';
const UploadPhoto = () => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);

  const uploadImage = async (file: File): Promise<ImageUploadItem> => {
    // 此处可以添加自定义的图片上传逻辑，例如上传到您自己的服务器
    // 然后返回一个包含上传后图片 URL 的对象
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
        content: '请先上传图片',
        icon: 'error',
        duration: 3000,
      });
      return;
    }

    //处理返回的base64编码
    // const base64ToBuffer = (base64:string):Uint8Array=> {
    //   const binaryString = atob(base64);
    //   const len = binaryString.length;
    //   const bytes = new Uint8Array(len);
    //   for (let i = 0; i < len; i++) {
    //     bytes[i] = binaryString.charCodeAt(i);
    //   }
    //   return Buffer.from(bytes.buffer);
    // };

    const client = new ImageAnnotatorClient();
    const base64Image = fileList[0].url.split('base64,')[1];
    const image = { content: base64Image };

    try {
      const [response] = await client.textDetection(image);
      const fullTextAnnotation = response.fullTextAnnotation;

      if (fullTextAnnotation) {
        // 在此处处理识别结果，如显示在页面上或发送到服务器
        console.log(fullTextAnnotation.text);
      } else {
        Toast.show({
          content: "Unable to recognize the text in the picture",
          icon: 'error',
          duration: 3000,
        });
        return;
      }
    } catch (error) {
      console.error('Error detecting text:', error);
      Toast.show({
        content: 'Recognition error, please try again',
        icon: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <>
      <ImageUploader value={fileList} onChange={setFileList} upload={uploadImage} />
      <Button onClick={onSubmit}>Submit</Button>
    </>
  );
};

export default UploadPhoto;
