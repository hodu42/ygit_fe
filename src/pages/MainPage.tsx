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
import React, { useEffect, useState } from 'react'
import { Image } from '@types';
import { FolderComponent } from '../components/FolderComponent';
import { ImageComponent } from '../components/ImageComponent';
import { SearchBox } from '../components/SearchBox';
import { MainLogo } from '../components/MainLogo';
import { MyPageMenu } from '../components/MyPageMenu';
import { ImageUploadTab } from '../tabs/ImageUploadTab'
import { MyLearningTab } from '../tabs/MyLearningTab'
import { Logout } from '../components/Logout'

export function MainPage(): React.ReactElement {

  const [folderList, setFolderList] = React.useState<string[]>([]);
  const [searchResult, setSearchResult] = React.useState<Image[]>([]);
  const navigate = useNavigate();

  // 로그인 안되어있으면 로그인 페이지로 자동 리다이렉션
  useEffect(() => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
  }, []);

  useEffect(() => {
    // 초기 폴더 및 이미지 설정
  }, []);

  const updateResult = (folder: string) => {
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
                  <ImageComponent name={image.name} src={image.src} tags={image.tags} />
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
