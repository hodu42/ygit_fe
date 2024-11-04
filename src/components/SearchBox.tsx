import {
  Icon, Input, InputGroup, InputLeftElement,
  Tag,
  TagLabel,
  TagCloseButton, Wrap, Select, Box, Text, WrapItem
} from '@chakra-ui/react'
import { IoSearchSharp } from "react-icons/io5";
import React, { useEffect } from 'react'

export function SearchBox() {
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");
  const [searchTagList, setSearchTagList] = React.useState<string[]>([]);
  const [modelList, setModelList] = React.useState<string[]>([]);

  useEffect( () => { // 서버로 부터 받아오는 코드
    setModelList([`COCO`, 'Object 365', '나만의 모델']);
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchKeyword.trim() !== '' && !searchTagList.find((keyword) => keyword === searchKeyword)) {
      setSearchTagList(prevTags => [...prevTags, searchKeyword.trim()]);
      setSearchKeyword(''); // 입력 필드 초기화
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSearchTagList(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Box mt={30}>
      <Box display="flex" justifyContent='space-between'>
        <InputGroup>
          <InputLeftElement width="5%" height="60px" pointerEvents="none">
            <Icon as={IoSearchSharp} boxSize="30px" color="#0dcbe4" />
          </InputLeftElement>

          <Input
            bg='#FFF'
            borderColor='transparent'
            pl="5%"
            width='70%'
            height="60px"
            placeholder="검색할 태그를 입력하세요"
            fontSize="1.3rem"
            fontWeight={600}
            focusBorderColor="#0dcbe4"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </InputGroup>
        <Box width='40rem' display="flex" justifyContent='space-between' alignItems="center">
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
            {
              modelList.map((model) => (
                <option value={model}>{model}</option>
              ))
            };
          </Select>
        </Box>
      </Box>
      <Wrap spacing={4} mt={10} mb={5} ml={7}>
        {searchTagList.map((tag) => (
          <WrapItem key={tag}>
            <Tag
              size='lg'
              borderRadius='full'
              variant='solid'
              bg='#0DCBE4'
              fontWeight='700'
              fontFamily='Pretendard'
              fontSize='1.15rem'
              sx={{
                height: '2.5rem',
                padding: '1rem',
              }}
              >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => removeTag(tag)} />
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}
