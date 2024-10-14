import { Link as ChakraLink } from '@chakra-ui/layout/dist/link'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Box, Icon, Tag, TagLabel, TagLeftIcon, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { TbArrowBackUp } from 'react-icons/tb'
import { FaTrashCan } from 'react-icons/fa6'
import { Image as ChakraImage } from '@chakra-ui/image/dist/image'
import { HiHashtag } from 'react-icons/hi'
import React from 'react'

export const DetailedImageTab = () => {

  const searchTagList = ['태그1', '태그2', '태그3', '태그4']

  return (
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
      <ChakraLink
        as={ReactRouterLink}
        to='/'
        display="inline-flex"
        position='absolute'
        top={8}
        right={10}
      >
        <Icon as={FaTrashCan} boxSize={70} color='#f43535'/>
      </ChakraLink>
      {/* 이미지의 갯수가 하나 일 때 보여주는 방식 */}
      <Box display="flex" flexDirection="column" justifyContent='center' alignItems='center'>
        <ChakraImage width='500px' objectFit="contain" src='https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?w=1200'/>
        <Text mt='7rem' fontSize="1.5rem">
          대충 파일이름.jpg
        </Text>
      </Box>
      <Wrap spacing={4} mb={5} mt='70px'>
        {searchTagList.map((tag) => (
          <WrapItem key={tag}>
            <Tag
              size='lg'
              borderRadius='full'
              variant='solid'
              bg='#0DCBE4'
              fontWeight='900'
              fontFamily='Pretendard'
              fontSize='1.15rem'
              sx={{
                height: '2.5rem',
                padding: '1rem',
              }}
            >
              <TagLeftIcon boxSize='25px' as={HiHashtag} color='#198290'/>
              <TagLabel>{tag}</TagLabel>
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  )
}