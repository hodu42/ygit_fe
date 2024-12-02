import { Box, Button, Flex, Text, Image, Select, Input } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { MyLearningPreview } from '../components/MyLearningPreview'
import { MyLearningUpload } from '../components/MyLearningUpload'

type MyLearningTabProps = {
  setTabIndex: (tabIndex: number) => void;
}

export const MyLearningTab = ({setTabIndex}: MyLearningTabProps):React.JSX.Element => {
  const [images, setImages] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const testComponent = (): React.ReactElement =>
    (
      <Box width={200} height={220} display="flex" flexDirection="column" justifyContent="space-evenly"
           alignItems="center">
        <Image width='200px' objectFit="contain"
                     src='https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?w=1200' />
        <Text fontSize="1.2rem">
          대충 파일이름.jpg
        </Text>
      </Box>
    )

  const modelList = ['모델1', '모델2', '모델3']

  const [labelInput, setLabelInput] = React.useState<string>('')

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