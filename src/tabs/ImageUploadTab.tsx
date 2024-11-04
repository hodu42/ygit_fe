import { Box, Button, Icon, Input, Text } from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'

// 파일 업로드 화면 컴포넌트
export function ImageUploadTab() {
  return (
    <Box mt='30px' width="80%" height='46rem' bg='#FFF'>
      <Box pt={200} pb={150}>
        <Icon as={FiUpload} boxSize={100} color='#DBDBDB' mb={5}/>
        <Text fontSize="2.2rem"
              fontWeight={700}
              color='#DBDBDB'>업로드 할 이미지를 드래그하거나,<br/>
          파일 탐색기에서 선택하세요.</Text>
      </Box>
      <Button bg='#0DCBE4'
              color='white'
              borderColor='transparent'
              fontSize="1.7rem"
              fontWeight={700}
              _hover={{backgroundColor: '#0DA3E4'}}
              sx={{
                padding: '27px 30px',
                marginBottom: '50px'
              }}>
        파일 탐색기에서 열기
      </Button>
    </Box>
    // 파일 업로드의 상태를 관리하여 업로드가 되면 요소 전체를 변경
    /* 이후 아래 내용 사용하기
  <Box display='flex'
               flexDirection='column'
               width='80%' height='46rem'
               borderRadius={5} bg='#FFF'
               mt={30}
               position='relative'
               justifyContent='center'
               alignItems='center'>
            <ChakraLink
              as={ReactRouterLink}
              to='/'
              display="inline-flex"
              position='absolute'
              top={5}
              left={10}
            >
              <Icon as={TbArrowBackUp} boxSize={90} color='#0dcbe4'/>
            </ChakraLink>
            // 이미지의 갯수가 하나일때 보여주는 방식
  <Box display="flex" flexDirection="column" justifyContent='center' alignItems='center' height='100%'>
    <ChakraImage width='500px' objectFit="contain" src='https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?w=1200'/>
    <Text mt='7rem' fontSize="1.5rem">
      대충 파일이름.jpg
    </Text>
  </Box>
  // 이미지의 갯수가 여러개 일 때 보여주는 방식
              <Flex width='100%'
                  justifyContent='space-evenly'
                  flexWrap='wrap'
                  overflowY='auto'
                  padding='0 15%'
            >
              {testComponent()}
            </Flex>
</Box>
  */
  )
}