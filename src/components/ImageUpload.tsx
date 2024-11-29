import { Box, Button, Icon, Text, useBreakpointValue } from '@chakra-ui/react'
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
  const isPhone = useBreakpointValue({base: true, lg: false})

  return (
    <Box width="60%"
         height='75%'
         borderRadius={5}
         bg='#FFF'
         display='flex'
         flexDirection='column'
         justifyContent='space-evenly'
         alignItems='center'
         onDrop={onDrop}
         onDragOver={onDragOver}
    >
      <Box>
        <Icon as={FiUpload} boxSize={{ base: 90, '2xl': 100}} color='#DBDBDB' mb={5} />
        {isPhone ? ''
          :
          <Text fontSize={{ base: '2rem' , '2xl': '2.2rem' }}
                fontWeight={700}
                color='#DBDBDB'>업로드 할 이미지를 드래그하거나,<br />
          파일 탐색기에서 선택하세요.</Text>}

      </Box>
      <input type='file' accept='image/*' ref={inputRef} onChange={onUploadImage} hidden />
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