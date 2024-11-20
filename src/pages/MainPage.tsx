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
import { useNavigate } from 'react-router-dom'
import { FaCloudArrowUp } from "react-icons/fa6";
import { AiFillPicture } from "react-icons/ai";
import { MdAddAPhoto } from "react-icons/md";
import React, { useEffect } from 'react'
import { ResultImageWithoutTags } from '@types';
import { FolderComponent } from '../components/FolderComponent';
import { ImageComponent } from '../components/ImageComponent';
import { SearchBox } from '../components/SearchBox';
import { MainLogo } from '../components/MainLogo';
import { MyPageMenu } from '../components/MyPageMenu';
import { ImageUploadTab } from '../tabs/ImageUploadTab'
import { MyLearningTab } from '../tabs/MyLearningTab'
import { Logout } from '../components/Logout'

export function MainPage(): React.ReactElement {
  const [searchKeyword, setSearchKeyword] = React.useState<string>("");
  const [searchResult, setSearchResult] = React.useState<ResultImageWithoutTags[]>([]);
  const navigate = useNavigate();

  // 로그인 안되어있으면 로그인 페이지로 자동 리다이렉션
  const checkToken = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

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
            <SearchBox searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} searchResult={searchResult} setSearchResult={setSearchResult} />
            <SimpleGrid justifyItems='center' columns={6} spacingY={8} mt={4}>
              {/* 폴더 리스트 보여주는 코드 */}
              {/*{*/}
              {/*  folderList.map((folder) => (*/}
              {/*    <FolderComponent key={folder} onClick={() => updateResult(folder)} folderName={folder} />*/}
              {/*  ))*/}
              {/*}*/}
              {
                searchResult.map((image) => (
                  <ImageComponent name={image.name} image={image.image}/>
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
