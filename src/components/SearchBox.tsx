import {
  Icon, Input, InputGroup, InputLeftElement,
  Tag,
  TagLabel,
  TagCloseButton, HStack, Select, Box, Text
} from '@chakra-ui/react'
import { IoSearchSharp } from "react-icons/io5";
import React from 'react';

export function SearchBox() {
  return (
    <Box width='80%'>
      <Box display="flex" justifyContent='space-evenly'>
        <InputGroup>
          <InputLeftElement width="5%" height="60px" pointerEvents="none">
            <Icon as={IoSearchSharp} boxSize="45px" color="#0dcbe4" />
          </InputLeftElement>

          <Input
            pl="5%"
            width='70%'
            height="60px"
            placeholder="검색할 태그를 입력하세요"
            fontSize="1.3rem"
            fontWeight={600}
            focusBorderColor="#0dcbe4"
          />
        </InputGroup>
        <Box ml='-15rem' width='40%' display="flex" justifyContent='space-between' alignItems="center">
          <Text fontSize='1.6rem' fontFamily='Pretendard' fontWeight='600' whiteSpace='nowrap'>사용할 모델</Text>
          <Select
            width='15rem'
            height='60px'
            bg='#0DCBE4'
            color='white'
            borderColor='none'
            fontSize="1.5rem"
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
            <option value='option1'>COCO</option>
            <option value='option2'>Object 365</option>
          </Select>
        </Box>

      </Box>
      <HStack spacing={4} mt={5} mb={5}>
        {['태그1', '태그2', '태그3', '있있있', '동해물과백두산이마르고닳도록'].map((content) => (
          <Tag
            size='lg'
            key={content}
            borderRadius='full'
            variant='solid'
            bg='#0DCBE4'
            fontWeight='900'
            fontFamily='Pretendard'
            fontSize='1.15rem'
            sx={{
              height: '3rem',
              padding: '1rem'
            }}
          >
            <TagLabel>{content}</TagLabel>
            <TagCloseButton />
          </Tag>
        ))}
      </HStack>
    </Box>
  );
}
