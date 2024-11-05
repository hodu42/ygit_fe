import { Box, Button, Icon, Text } from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'
import React from 'react'

type ImageUploadProps = {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onUploadImageBtnClick: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload:React.FC<ImageUploadProps> = ({ onDrop, onDragOver, onUploadImageBtnClick, inputRef, onUploadImage }) => {

  return (
    <Box mt='30px' width="80%" height='46rem' bg='#FFF'
         onDrop={onDrop}
         onDragOver={onDragOver}
    >
      <Box pt={200} pb={150}>
        <Icon as={FiUpload} boxSize={100} color='#DBDBDB' mb={5} />
        <Text fontSize="2.2rem"
              fontWeight={700}
              color='#DBDBDB'>업로드 할 이미지를 드래그하거나,<br />
          파일 탐색기에서 선택하세요.</Text>
      </Box>
      <input type='file' accept='image/*' ref={inputRef} onChange={onUploadImage} hidden />
      <Button bg='#0DCBE4'
              color='white'
              borderColor='transparent'
              fontSize="1.7rem"
              fontWeight={700}
              _hover={{ backgroundColor: '#0DA3E4' }}
              type='submit'
              sx={{
                padding: '27px 30px',
                marginBottom: '50px'
              }}
              onClick={onUploadImageBtnClick}
      >
        파일 탐색기에서 열기
      </Button>
    </Box>
  )
}