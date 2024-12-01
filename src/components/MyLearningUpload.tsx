import { Box, Button, Icon, Text, useBreakpointValue } from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'
import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/Config'
import useToastHandler from '../components/useToastHandler'

type MyLearningUploadProps = {
  onUploadImageBtnClick: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MyLearningUpload:React.FC<MyLearningUploadProps> = ({ onUploadImageBtnClick, inputRef, onUploadImage }) => {
  const isPhone = useBreakpointValue({base: true, lg: false});
  const showToast = useToastHandler();
  
  // 이미지들을 업로드 하는 코드
  const handleMyLearning = async (images: File[]) => {

    // FormData 객체 생성
    const formData = new FormData()

    // 업로드한 이미지들을
    images.forEach((image) => {
      if (image instanceof File && image.size > 0) {
        formData.append('image', image);
      }
    })

    try {
      const response = await axios.post(`${BASE_URL}/upload-image`, formData, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      return response.data;
    } catch (error) {
      showToast('이미지 업로드 실패', '업로드에 실패하였습니다.', 'error');
    }
  }

  return (
    <Box width="60%"
         height='100%'
         borderRadius={5}
         bg='#FFF'
         display='flex'
         flexDirection='column'
         justifyContent='space-evenly'
         alignItems='center'
    >
      <Box>
        <Icon as={FiUpload} boxSize={{ base: 90, '2xl': 100}} color='#DBDBDB' mb={5} />
        {isPhone ? ''
          :
          <Text fontSize={{ base: '2rem' , '2xl': '2.2rem' }}
                fontWeight={700}
                color='#DBDBDB'>업로드 할 이미지들을 ,<br />
            파일 탐색기에서 선택하세요.</Text>}

      </Box>
      <input type='file' accept='image/*' ref={inputRef} onChange={onUploadImage} multiple hidden />
      <Button minWidth='269px'
              width='30%'
              bg='#0DCBE4'
              color='white'
              borderColor='transparent'
              fontSize={{ base: '1.5rem' , '2xl': '1.7rem' }}
              fontWeight={700}
              _hover={{ backgroundColor: '#0DA3E4' }}
              type='submit'
              sx={{
                padding: '27px 30px'
              }}
              onClick={onUploadImageBtnClick}
      >
        파일 탐색기에서 열기
      </Button>
    </Box>
  )
}