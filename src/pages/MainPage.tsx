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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FaCloudArrowUp } from "react-icons/fa6";
import { AiFillPicture } from "react-icons/ai";
import { MdAddAPhoto } from "react-icons/md";
import React, { useEffect } from 'react'
import axios from 'axios'
import { ImgIdx, ResultImageWithoutTags, ResultImage } from '@types'
import { FolderComponent } from '../components/FolderComponent';
import { ImageComponent } from '../components/ImageComponent';
import { SearchBox } from '../components/SearchBox';
import { MainLogo } from '../components/MainLogo';
import { MyPageMenu } from '../components/MyPageMenu';
import { ImageUploadTab } from '../tabs/ImageUploadTab'
import { MyLearningTab } from '../tabs/MyLearningTab'
import { Logout } from '../components/Logout'
import { BASE_URL } from '../config/Config'
import useToastHandler from '../components/useToastHandler'
import { ImagePreview } from '../components/ImagePreview'
import { ModalImagePreview } from '../components/ModalImagePreview'

export function MainPage(): React.ReactElement {
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");
  const [searchResult, setSearchResult] = React.useState<ImgIdx[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [modalImage, setModalImage] = React.useState<ResultImage | null>(null);
  const navigate = useNavigate();
  const showToast = useToastHandler();

  // 로그인 안되어있으면 로그인 페이지로 자동 리다이렉션
  const checkToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }

  const handleImageClick = async (imageName: string ) => {
    try {
      // const response = await axios.get(`${BASE_URL}/image-info/${imageName}`);
      // setModalImage(response.data);
      const tempImage: ResultImage = {
        name: searchResult[0].name,
        image: searchResult[0].src,
        tags: ['태그1', '태그2', '태그3']
      }
      setModalImage(tempImage);
      setIsOpen(true);
    } catch (error) {
      showToast('이미지 불러오기 실패', '불러오기에 실패하였습니다.', 'error');
    }
  }

  const handleClose = () => {
    setIsOpen(false);
    setModalImage(null);
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
                  <ImageComponent name={image.name} image={image.src} onClick={() => handleImageClick(image.src)}/>
                ))
              }
              <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent minWidth='60%' height='85%'>
                  <ModalCloseButton />
                  <ModalBody padding={0}>
                    {modalImage ? (
                      <ModalImagePreview img={modalImage}/>
                    ) : (
                      <p>데이터를 불러오는 중입니다...</p>
                    )}
                  </ModalBody>
                </ModalContent>
              </Modal>
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
