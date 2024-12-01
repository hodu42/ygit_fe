import { Link as ReactRouterLink } from 'react-router-dom'
import { Box, Icon, Tag, TagLabel, TagLeftIcon, Text, Wrap, WrapItem, Image as ChakraImage, Link as ChakraLink } from '@chakra-ui/react'
import { FaTrashCan } from 'react-icons/fa6'
import { HiHashtag } from 'react-icons/hi'
import React from 'react'
import { ResultImage } from '@types'

type ImagePreviewProps = {
  img: ResultImage
}

export const ModalImagePreview: React.FC<ImagePreviewProps> = ({ img }) => {
  return (
    <Box display='flex'
         flexDirection='column'
         width='100%' height='100%'
         borderRadius={5} bg='#FFF'
         position='relative'
         justifyContent='space-evenly'
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
      <Box display="flex" width='80%' height='80%' flexDirection="column" justifyContent='space-evenly' alignItems='center'>
        <ChakraImage width='80%' height='60%' objectFit="contain" src={img.image}/>
        <Text fontSize="1.5rem">
          {img.name}
        </Text>
      </Box>
      <Wrap spacing={4}>
        {img.tags.length === 0
          ?
          <WrapItem key='empty'>
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
              <TagLabel>추출된 태그 없음</TagLabel>
            </Tag>
          </WrapItem>
          :
          img.tags.map((tag) => (
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
          ))
        }
      </Wrap>
    </Box>
  )
}