import { Box } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { MyLearningPreview } from '../components/MyLearningPreview'
import { MyLearningUpload } from '../components/MyLearningUpload'

type MyLearningTabProps = {
  setTabIndex: (tabIndex: number) => void;
}

export const MyLearningTab = ({setTabIndex}: MyLearningTabProps):React.JSX.Element => {
  const [images, setImages] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImageBtnClick = () => {
    inputRef.current?.click();
  };

  // 이미지들을 업로드하면 그 리스트들을 저장
  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = [...images];

    for (let i = 0; i < e.target.files!.length; i++) {
      const file = e.target.files![i];
      newImages.push(file);
    }
    setImages(newImages);
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center' width="60%" height='75%' bg='#FFF' borderRadius={5}>
      {/* 이미지가 없으면 업로드 화면 / 있으면 이미지들을 보여줌 */}
      {
        images.length > 0 ?
          <MyLearningPreview imgs={images} setTabIndex={setTabIndex}/>
          :
          <MyLearningUpload
            onUploadImageBtnClick={onUploadImageBtnClick}
            inputRef={inputRef}
            onUploadImage={onUploadImage}
            />
      }
    </Box>
  )
}