import {
  Box,
  Button,
  Icon,
  Input,
  Text,
  Link as ChakraLink,
  Image as ChakraImage,
  Flex,
  Wrap,
  WrapItem, Tag, TagLeftIcon, TagLabel
} from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { TbArrowBackUp } from 'react-icons/tb'
import { Image } from '@types'
import { FaTrashCan } from 'react-icons/fa6'
import { HiHashtag } from 'react-icons/hi'
import { BackButton } from '../components/BackButton'
import axios from 'axios'
import { BASE_URL } from '../config/Config'

// 파일 업로드 화면 컴포넌트
export function ImageUploadTab():React.JSX.Element {

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [img, setImg] = useState<Image | null>(null);

  // 파일을 업로드 하는 코드
  const handleImageUpload = async (file: Blob) => {
    // FormData 객체 생성
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(`${BASE_URL}/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // 인증 토큰 포함
        },
      })
      return response.data;
      // 서버에서 반환된 데이터 처리
    } catch (error) {
      alert('파일 업로드에 실패하였습니다.')
    }
  }

  // 이미지로부터 태그 리스트를 가져오는 코드
  const getTagsFromImg = async (file: Blob):Promise<string[]> => {
    // FormData 객체 생성
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(`${BASE_URL}/extract-tags`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, // 인증 토큰 포함
        },
      })
      return response.data;
      // 서버에서 반환된 데이터 처리
    } catch (error) {
      alert('태그 추출에 실패하였습니다.')
    }
  }

  // 이미지 드롭했을 때 발생하는 이벤트 코드
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // img가 존재할 경우 드롭 이벤트를 무시
    if (img) return;
    const {files} = e.dataTransfer;

    if (files && files.length > 0) {
      const file = files[0];
      const img = handleImageUpload(file);
      const tags =
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        // reader.result가 string일 때만 상태 업데이트
        if (typeof reader.result === 'string') {
          // 통신으로 가져온 이미지객체를 setImg하기
          setImg({
            name: file.name,
            src: reader.result,
            id: '',
            tags: ['태그1', '태그2', '태그3', '태그4'] // 필요할 경우 태그 설정
          });
          console.log(reader.result);
        }
      };
    }
  }

  // 브라우저의 기본 이벤트 없애기
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const onUploadImageBtnClick = () => {
    inputRef.current?.click();
  };

  // 버튼으로 이미지 업로드 했을 때 실행하는 코드
  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      try {
        const reader = new FileReader()
        const result = handleImageUpload(file);

        reader.readAsDataURL(file)
        reader.onloadend = () => {
          // reader.result가 string일 때만 상태 업데이트
          if (typeof reader.result === 'string') {
            // 통신으로 가져온 이미지객체를 setImg하기 (현재는 임시)
            setImg({
              id: result.id,
              name: result.name,
              src: reader.result, // Data URL
              tags: ['새'],
            })
          }
        }
      } catch(any) {
        alert('이미지 업로드 실패');
      }
    }
  }, []);
  return (
    <Box>
      {/* 이미지가 없으면 업로드화면 / 있으면 이미지 보여줌 */}
      {img ? (
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
      ) : (
        <Box mt='30px' width="80%" height='46rem' bg='#FFF'
             onDrop={handleDrop}
             onDragOver={handleDragOver}
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
      )}
    </Box>
  );
}