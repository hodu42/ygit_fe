import {
  Icon,
  TabPanel,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  Box,
  SimpleGrid,
  Text,
  Button,
  ButtonGroup,
  Link as ChakraLink,
  Image as ChakraImage, Flex, Alert, AlertIcon, WrapItem, Tag, TagLabel, TagCloseButton, Wrap, TagLeftIcon
} from '@chakra-ui/react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { FaCloudArrowUp, FaTrashCan } from "react-icons/fa6";
import { AiFillPicture } from "react-icons/ai";
import { MdAddAPhoto, MdOutlineFileUpload } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { HiHashtag } from 'react-icons/hi';
import { TbArrowBackUp } from "react-icons/tb";
import React, { useEffect, useState } from 'react'
import { Image } from '@types';
import { FolderComponent } from '../components/FolderComponent';
import { ImageComponent } from '../components/ImageComponent';
import { SearchBox } from '../components/SearchBox';
import { MainLogo } from '../components/MainLogo';
import { MyPageMenu } from '../components/MyPageMenu';
import { UploadSuccessToast } from '../components/UploadSuccessToast'
import { ImageUploadTab } from '../tabs/ImageUploadTab'
import { MyLearningTab } from '../tabs/MyLearningTab'
import { Logout } from '../components/Logout'

export function MainPage(): React.ReactElement {

  const [folderList, setFolderList] = React.useState<string[]>([]);
  const [searchResult, setSearchResult] = React.useState<Image[]>([]);
  const navigate = useNavigate();
  const { uploadToast } = UploadSuccessToast();

  // 로그인 안되어있으면 로그인 페이지로 자동 리다이렉션
  useEffect(() => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
  }, []);

  const handleUpload = () => {
    uploadToast()
  }
  // 테스트용 컴포넌트
  // const testComponent = (): React.ReactElement =>
  //   (
  //     <Box width={200} height={220} display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
  //       <ChakraImage width='200px' objectFit="contain" src='https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?w=1200'/>
  //       <Text fontSize="1.2rem">
  //         대충 파일이름.jpg
  //       </Text>
  //     </Box>
  //     )

  const img1: Image = {
    id: "ss",
    name: "태그1 이미지.jpg",
    src: "https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?w=1200",
    tags: ["태그1", "태그2", "태그3"]
  };
  const img2: Image = {
    id: "dd",
    name: "태그2 이미지.jpg",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1200px-Cat_August_2010-4.jpg",
    tags: ["태그1", "태그2", "태그3"]
  };

  // 폴더 이름 배열
  const folders = ["폴더1", "폴더2", "폴더3", "폴더3", "폴더3", "폴더3", "폴더3", "폴더3", "폴더3", "폴더3", "폴더3", "폴더3", "폴더3", "폴더3", "폴더3", "폴더3"];

  useEffect(() => {
    // 초기 폴더 및 이미지 설정
    setSearchResult([img1, img1, img1, img1, img1]);
    setFolderList(folders);
  }, []);

  const updateResult = (folder: string) => {
    // 폴더에 따라 다른 이미지 배열 설정
    if (folder === "폴더1") {
      setFolderList([]);
      setSearchResult([img1, img1, img1, img1, img1]);
    } else {
      setFolderList([]);
      setSearchResult([img2, img2, img2, img2, img2]);
    }
  };

  return (
    <Tabs isLazy align="center" defaultIndex={1} variant="unstyled" overflow='hidden'>
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

      <TabPanels bg='#F4F6F9' height='890px'>
        <TabPanel overflow='hidden'>
          <ImageUploadTab/>
        </TabPanel>
        <TabPanel overflowY='auto' height='87vh'>
          <Flex width='80%' flexDirection='column'>
            <SearchBox />
            <SimpleGrid justifyItems='center' columns={6} spacingY={8} mt={4}>
              {
                folderList.map((folder) => (
                  <FolderComponent key={folder} onClick={() => updateResult(folder)} folderName={folder} />
                ))
              }
              {
                searchResult.map((image) => (
                  <ImageComponent key={image.id} id={image.id} name={image.name} src={image.src} tags={image.tags} />
                ))
              }
            </SimpleGrid>
          </Flex>
        </TabPanel>
        <TabPanel overflow='hidden' height='87vh'>
          <MyLearningTab/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
