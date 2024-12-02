import {
  Icon, Input, InputGroup, InputLeftElement,
  Tag,
  TagLabel,
  TagCloseButton, Wrap, Select, Box, Text, WrapItem, Button
} from '@chakra-ui/react'
import { IoSearchSharp } from "react-icons/io5";
import React, { useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { ImgIdx } from '@types'
import { BASE_URL } from '../config/Config'
import useToastHandler from '../components/useToastHandler'
import { useNavigate } from 'react-router-dom'

type SearchBoxProps = {
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  searchResult: ImgIdx[];
  setSearchResult: React.Dispatch<React.SetStateAction<ImgIdx[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchBox: React.FC<SearchBoxProps>  = ({searchKeyword, setSearchKeyword, searchResult, setSearchResult, isLoading, setIsLoading}) => {
  const [searchTagList, setSearchTagList] = React.useState<string[]>([]);
  const showToast = useToastHandler();
  const navigate = useNavigate();

  useEffect( () => { // 서버로 부터 받아오는 코드
    handleSearch();
  }, [searchTagList]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchKeyword.trim() !== '' && !searchTagList.find((keyword) => keyword === searchKeyword)) {
      setSearchTagList(prevTags => [...prevTags, searchKeyword.trim()]);
      setSearchKeyword(''); // 입력 필드 초기화
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(!isLoading);

      // 1. 태그로 검색하여 이미지 정보 가져오기
      const searchResponse = await axios.post<ImgIdx[]>(`${BASE_URL}/search-by-tags`, searchTagList, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      // 2. 이미지 데이터를 저장할 배열
      const imgList: ImgIdx[] = [];

      searchResponse.data.map((result) => {
        imgList.push({
          src: result.src,
          name: result.name
        })
      })

      setSearchResult(imgList);
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          showToast('로그인 정보 만료', '다시 로그인해주세요', 'warning');
          sessionStorage.removeItem('token');
          navigate('/login');
        }
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSearchTagList(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Box mt={30}>
      <Box display="flex" justifyContent='space-evenly'>
        <InputGroup alignItems='center'>
          <InputLeftElement width="5%" height="60px" pointerEvents="none">
            <Icon as={IoSearchSharp} boxSize="30px" color="#0dcbe4" />
          </InputLeftElement>
          <Input
            bg='#FFF'
            borderColor='transparent'
            pl="5%"
            width='100%'
            height="60px"
            placeholder="검색할 태그를 입력하세요"
            fontSize="1.3rem"
            fontWeight={600}
            focusBorderColor="#0dcbe4"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button bg='#0DCBE4'
                  color='white'
                  borderColor='transparent'
                  fontSize="1.4rem"
                  fontWeight={700}
                  _hover={{ backgroundColor: '#0DA3E4' }}
                  type='button'
                  sx={{
                    padding: '27px 30px',
                    marginLeft: '30px'
                  }}
                  onClick={handleSearch}
          >
            검색
          </Button>
        </InputGroup>
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
