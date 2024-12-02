import { Box, Button, Flex, Input, Select, Text } from '@chakra-ui/react'
import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/Config'
import useToastHandler from '../components/useToastHandler'
import { MyLearningImageComponent } from '../components/MyLearningImageComponent'

type MyLearningPreviewProps = {
  imgs: File[]
}

export const MyLearningPreview: React.FC<MyLearningPreviewProps> = ({ imgs }) => {
  const [modelList, setModelList] = useState<string[]>([])
  const [selectedModel, setSelectedModel] = useState<string>('');
  const showToast = useToastHandler();
  const [labelInput, setLabelInput] = React.useState<string>('')
  const [newModelInput, setNewModelInput] = React.useState<string>('')

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
    formData.append('newModelName', newModelInput)

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

  const handleFetchModel = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/mypage-view-model`, undefined, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setModelList(response.data.model_list)
      setSelectedModel(response.data.model_list[0])
    } catch (error) {
      showToast('모델 정보 불러오기 실패', '불러오기에 실패하였습니다.', 'error');
    }
  }

  useEffect( () => { // 서버로 부터 받아오는 코드
    // 서버로부터 모델 리스트를 받아오는 코드
    handleFetchModel();
  }, []);

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
            <MyLearningImageComponent name={img.name} src={window.URL.createObjectURL(img)}/>
          ))
        }
      </Flex>
      <Box display="flex" flexDirection='column' width='80%' alignItems='center' marginTop='20px' borderTop='3px solid #E8E9EB'>
        <Box>
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
          <Box display='flex' alignItems='center' mt='20px'>
            <Input
              bg='#f4f6f9'
              borderColor='transparent'
              pl="5%"
              width='100%'
              height="50px"
              placeholder="새 모델의 이름을 입력"
              textAlign="center"
              fontSize="1.3rem"
              fontWeight={600}
              focusBorderColor="#0dcbe4"
              value={newModelInput}
              onChange={(e) => setNewModelInput(e.target.value)}
            />
          </Box>
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