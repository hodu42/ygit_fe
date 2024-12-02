import {
  Icon,
  TabPanel,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  Box,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaCloudArrowUp } from "react-icons/fa6";
import { AiFillPicture } from "react-icons/ai";
import { MdAddAPhoto } from "react-icons/md";
import React, { useEffect } from 'react'
import { ImgIdx, ResultImage } from '@types'
import { ImageComponent } from '../components/ImageComponent';
import { SearchBox } from '../components/SearchBox';
import { MainLogo } from '../components/MainLogo';
import { MyPageMenu } from '../components/MyPageMenu';
import { ImageUploadTab } from '../tabs/ImageUploadTab'
import { MyLearningTab } from '../tabs/MyLearningTab'
import { Logout } from '../components/Logout'
import useToastHandler from '../components/useToastHandler'
import { ModalImagePreview } from '../components/ModalImagePreview'
import { ModalImage } from '../components/ModalImage'
import { BASE_URL } from '../config/Config'

export function MainPage(): React.ReactElement {
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");
  const [searchResult, setSearchResult] = React.useState<ImgIdx[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [modalImage, setModalImage] = React.useState<ResultImage | null>(null);
  const [currentImageSrc, setCurrentImageSrc] = React.useState<string>('');
  const navigate = useNavigate();
  const showToast = useToastHandler();

  // 로그인 안되어있으면 로그인 페이지로 자동 리다이렉션
  const checkToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }

  const handleImageClick = async (image_src: string ) => {
    try {
      image_src = image_src.replace("uploads\\", '')
      setCurrentImageSrc(image_src);
      const data = {
        image_src: image_src
      }
      const response = await axios.post<ResultImage>(`${BASE_URL}/view-images/`, data , {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setModalImage({
        name: response.data.name,
        src: `${BASE_URL}/${response.data.src}`,
        tags: response.data.tags
      });

      setIsOpen(true);
    } catch (error) {
      showToast('이미지 불러오기 실패', '불러오기에 실패하였습니다.', 'error');
    }
  }

  const handleClose = () => {
    setIsOpen(false);
    setModalImage(null);
  }

  // 삭제버튼 눌렀을 때 코드
  const handleDeleteImage = async (currentImageSrc: string) => {
    try {
      const data = {
        image_name: currentImageSrc
      }
      const response = await axios.delete(`${BASE_URL}/delete-image`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        data: data
      })
      showToast('이미지 삭제 성공', `${modalImage?.name} 삭제 완료`, 'success');
      // resultImage 초기화
      setModalImage(null);
      setCurrentImageSrc('');
      handleClose();
      // 삭제시 태그 없이 다시 검색하게 만들기
      window.location.reload();
    } catch  (error) {
      showToast('이미지 삭제 실패', '이미지 삭제에 실패하였습니다.', 'error');
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Tabs isLazy align="center" defaultIndex={1} variant="unstyled" overflow='hidden' height='100vh'>
      <Box position="sticky" top={0} height={120} bg='#FFF' zIndex='10'>
        <MainLogo />
        <TabList display="flex" width={400} height={120} justifyContent="space-between">
          <Tab _selected={{ color: '#0dcbe4' }}><Icon as={FaCloudArrowUp} boxSize={85} /></Tab>
          <Tab _selected={{ color: '#0dcbe4' }}><Icon as={AiFillPicture} boxSize={85} /></Tab>
          <Tab _selected={{ color: '#0dcbe4' }}><Icon as={MdAddAPhoto} boxSize={85} /></Tab>
        </TabList>
        <Logout/>
        <MyPageMenu />
      </Box>

      <TabPanels display='block' bg='#F4F6F9' height='calc(100% - 120px)'>
        <TabPanel height='100%' padding='0'>
          <ImageUploadTab/>
        </TabPanel>
        <TabPanel overflowY='auto' height='87vh'>
          <Flex width='80%' flexDirection='column'>
            <SearchBox searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} searchResult={searchResult} setSearchResult={setSearchResult} />
            <SimpleGrid justifyItems='center' columns={{ base: 1, sm: 2, md: 3, lg: 4, '2xl': 6}} spacingY={8}>
              {/* 폴더 리스트 보여주는 코드 */}
              {/*{*/}
              {/*  folderList.map((folder) => (*/}
              {/*    <FolderComponent key={folder} onClick={() => updateResult(folder)} folderName={folder} />*/}
              {/*  ))*/}
              {/*}*/}
              {
                searchResult.map((image) => (
                  <ImageComponent name={image.name} image={`${BASE_URL}/${image.src}`} onClick={() => handleImageClick(image.src)}/>
                ))
              }
              <ModalImage isOpen={isOpen} handleClose={handleClose} modalImage={modalImage} onClick={() => handleDeleteImage(currentImageSrc)}/>
            </SimpleGrid>
          </Flex>
        </TabPanel>
        <TabPanel display='flex' justifyContent='center' alignItems='center' overflow='hidden' height='100%' padding='0'>
          <MyLearningTab/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
