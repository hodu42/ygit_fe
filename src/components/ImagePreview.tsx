import { Link as ReactRouterLink } from 'react-router-dom'
import { Box, Icon, Tag, TagLabel, TagLeftIcon, Text, Wrap, WrapItem, Image as ChakraImage, Link as ChakraLink } from '@chakra-ui/react'
import { FaTrashCan } from 'react-icons/fa6'
import { HiHashtag } from 'react-icons/hi'
import React from 'react'
import { Image } from '@types'

type ImagePreviewProps = {
  img: Image
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ img }) => {
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
        top={8}
        right={10}
      >
        <Icon as={FaTrashCan} boxSize={70} color='#f43535'/>
      </ChakraLink>
      {/* 이미지의 갯수가 하나 일 때 보여주는 방식 */}
      <Box display="flex" flexDirection="column" justifyContent='center' alignItems='center'>
        <ChakraImage width='500px' height='300px' objectFit="contain" src={img.src}/>
        <Text mt='7rem' fontSize="1.5rem">
          {img.name}
        </Text>
      </Box>
      <Wrap spacing={4} mb={5} mt='70px'>
        {img.tags.map((tag) => (
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