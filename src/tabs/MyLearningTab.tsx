import { Box, Button, Flex, Icon, Text, Image, Select, Input } from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'
import React, { useState } from 'react'

export const MyLearningTab = () => {
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

  return (
    <Box display='flex' flexDirection='column' alignItems='center' mt='30px' width="80%" height='46rem' bg='#FFF'>
      <Flex width='100%'
            justifyContent='space-evenly'
            flexWrap='wrap'
            overflowY='auto'
            padding='0 15%'
            height='80%'
      >
        {testComponent()}
        {testComponent()}
        {testComponent()}
        {testComponent()}
        {testComponent()}
        {testComponent()}
        {testComponent()}
        {testComponent()}
        {testComponent()}
        {testComponent()}
        {testComponent()}
        {testComponent()}
      </Flex>
      <Box display="flex" flexDirection='column' width='80%' alignItems='center' marginTop='20px' borderTop='3px solid #E8E9EB'>
        <Box display='flex' alignItems='center' mt='20px'>
          <Text mr='10px' fontSize='1.5rem' fontFamily='Pretendard' fontWeight='600' whiteSpace='nowrap'>학습시킬 모델 :</Text>
          <Select
            width='10rem'
            height='50px'
            bg='#0DCBE4'
            color='white'
            borderColor='none'
            fontSize="1.4rem"
            fontFamily='Pretendard'
            fontWeight={600}
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
            };
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
            ml='40px'
            _hover={{backgroundColor: '#0DA3E4'}}
            sx={{
              padding: '0 40px'
            }}>
            학습
          </Button>
        </Box>
      </Box>
    </Box>
    /*
      <Box pt={200} pb={150}>
      <Icon as={FiUpload} boxSize={100} color='#DBDBDB' mb={5}/>
      <Text fontSize="2.2rem"
            fontWeight={700}
            color='#DBDBDB'>학습시킬 이미지들을<br/>
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
    */
  )
}