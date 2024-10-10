import {
  Icon,
  TabPanel,
  Tabs,
  TabList,
  Tab, TabPanels, Box, SimpleGrid, Text, Button, ButtonGroup
} from '@chakra-ui/react'
import { FaCloudArrowUp } from "react-icons/fa6";
import { AiFillPicture } from "react-icons/ai";
import { MdAddAPhoto, MdOutlineFileUpload } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import React, { useEffect, useState } from 'react'
import { Image } from '@types';
import { FolderComponent } from './FolderComponent';
import { ImageComponent } from './ImageComponent';
import { SearchBox } from './SearchBox';
import { MainLogo } from './MainLogo';
import { MyPageMenu } from './MyPageMenu';

export function IconMenus(): React.ReactElement {

  const [folderList, setFolderList] = React.useState<string[]>([]);
  const [searchResult, setSearchResult] = React.useState<Image[]>([]);

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
  const folders = ["폴더1", "폴더2", "폴더3"];

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
    <Tabs isLazy align="center" defaultIndex={1} variant="unstyled">
      <Box position="relative" height={120}>
        <MainLogo />
        <TabList display="flex" width={400} height={120} justifyContent="space-between">
          <Tab _selected={{ color: '#0dcbe4' }}><Icon as={FaCloudArrowUp} boxSize={85} /></Tab>
          <Tab _selected={{ color: '#0dcbe4' }}><Icon as={AiFillPicture} boxSize={85} /></Tab>
          <Tab _selected={{ color: '#0dcbe4' }}><Icon as={MdAddAPhoto} boxSize={85} /></Tab>
        </TabList>
        <MyPageMenu />
      </Box>

      <TabPanels bg='#F4F6F9'>
        <TabPanel>
          <Box width='80%' height='77vh' borderRadius={5} bg='#FFF' mt={30} mb={30}>
            <Box pt={200} pb={150}>
              <Icon as={FiUpload} boxSize={100} color='#DBDBDB' mb={5}/>
              <Text fontSize="2.2rem"
                    fontWeight={900}
                    color='#DBDBDB'
              >업로드 할 이미지를 드래그하거나,<br/>
                파일 탐색기에서 선택하세요.</Text>
            </Box>
            <Button bg='#0DCBE4'
                      color='white'
                      borderColor='transparent'
                      fontSize="1.7rem"
                      fontWeight={900}
                      _hover={{backgroundColor: '#0DA3E4'}}
                      sx={{ padding: '27px 30px' }}>
                파일 탐색기에서 열기
            </Button>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box width='80%' height='80vh'>
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
          </Box>
        </TabPanel>
        <TabPanel display="flex" flexDirection="column">
          <div />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
