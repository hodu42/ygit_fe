import { Box, Button, Flex, Input, Select, Text } from '@chakra-ui/react'
import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/Config'
import useToastHandler from '../components/useToastHandler'
import { ImageComponent } from '../components/ImageComponent'

type MyLearningPreviewProps = {
  imgs: File[]
}

export const MyLearningPreview: React.FC<MyLearningPreviewProps> = ({ imgs }) => {
  const modelList = ['모델1', '모델2', '모델3']
  const [selectedModel, setSelectedModel] = useState<string>('');
  const showToast = useToastHandler();
  const [labelInput, setLabelInput] = React.useState<string>('')

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value)
  }

  const handleImagesUpload = async () => {
    // formData 객체 생성
    const formData = new FormData()
    // 이미지들을 formData에 image로 저장
    imgs.map((img) => formData.append('image', img))
    formData.append('label', labelInput)
    formData.append('model', selectedModel)

    try {
      const response = await axios.post(`${BASE_URL}/`, formData, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      return response.data
    } catch (error) {
      showToast('이미지 업로드 실패', '업로드에 실패하였습니다.', 'error');
    }
  }

  return (
    <Fragment>
      <Flex width='100%'
            justifyContent='space-evenly'
            flexWrap='wrap'
            overflowY='auto'
            padding='0 15%'
            height='80%'
      >
        {
          imgs.map((img) => (
            <ImageComponent name={img.name} image={window.URL.createObjectURL(img)}/>
          ))
        }
      </Flex>
      <Box display="flex" flexDirection='column' width='80%' alignItems='center' marginTop='20px' borderTop='3px solid #E8E9EB'>
        <Box display='flex' alignItems='center' mt='20px'>
          <Text mr='10px' fontSize='1.5rem' fontFamily='Pretendard' fontWeight='600' whiteSpace='nowrap'>학습시킬 모델 :</Text>
          <Select
            width='10rem'
            height='50px'
            bg='#0DCBE4'
            color='white'
            border="none"
            fontSize="1.4rem"
            fontFamily='Pretendard'
            fontWeight={600}
            onChange={handleChangeSelect}
            sx={{
              textAlign: 'center',
              option: {
                textAlign: 'center',
                backgroundColor: 'transparent',
                fontWeight: '600'
              },
            }}>
            {
              modelList.map((model) => (
                <option value={model}>{model}</option>
              ))
            }
          </Select>
        </Box>
        <Box display='flex' justifyContent='space-evenly' alignItems='center' mt='20px' mb='20px'>
          <Input
            bg='#f4f6f9'
            borderColor='transparent'
            pl="5%"
            width='100%'
            height="50px"
            placeholder="Label을 입력"
            textAlign="center"
            fontSize="1.3rem"
            fontWeight={600}
            focusBorderColor="#0dcbe4"
            value={labelInput}
            onChange={(e) => setLabelInput(e.target.value)}
          />
          <Button
            bg='#0DCBE4'
            color='white'
            borderColor='transparent'
            fontSize="1.4rem"
            fontWeight={700}
            height='50px'
            onClick={handleImagesUpload}
            ml='40px'
            _hover={{backgroundColor: '#0DA3E4'}}
            sx={{
              padding: '0 40px'
            }}>
            학습
          </Button>
        </Box>
      </Box>
    </Fragment>
  )
}