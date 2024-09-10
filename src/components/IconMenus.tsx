import {
  Icon,
  TabPanel,
  Tabs,
  TabList,
  Tab, TabPanels
} from '@chakra-ui/react'
import { FaCloudArrowUp } from "react-icons/fa6";
import { AiFillPicture } from "react-icons/ai";
import { MdAddAPhoto } from "react-icons/md";
import React from 'react'
import { FolderComponent } from './FolderComponent'
import { ImageComponent } from './ImageComponent'

export function IconMenus(): React.ReactElement {

  const kor = "안녕하세요안녕하세요안녕하세요안녕하세요.jpg";
  const eng = "hihihihihihihihihihihihihihihihihihihihihihiskladfjklasdjflsdjflkjsd.jpg";
  const korEng = "안sdffdasdfㅇ하잉ㄴsdfsdfsdfsdfㄴㅇ리만ㅇㄹㅇㄴㄴㄹ.jpg";
  const image = "https://static.scientificamerican.com/sciam/cache/file/2AE14CDD-1265-470C-9B15F49024186C10_source.jpg?w=1200";
  const image2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYt-AZqr1QCfIrx9MbWxLRgrQz7VvQNX-84g&s";
  return (
    <Tabs isLazy align="center" defaultIndex={1} variant="unstyled">
      <TabList display="flex" width={400} height={120} justifyContent="space-between">
        <Tab _selected={{ color: '#0dcbe4' }}><Icon as={FaCloudArrowUp} boxSize={85}/></Tab>
        <Tab _selected={{ color: '#0dcbe4' }}><Icon as={AiFillPicture} boxSize={85}/></Tab>
        <Tab _selected={{ color: '#0dcbe4' }}><Icon as={MdAddAPhoto} boxSize={85}/></Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <FolderComponent fileName={kor}/>
        </TabPanel>
        <TabPanel>
          <FolderComponent fileName={eng}/>
        </TabPanel>
        <TabPanel display="flex">
          <FolderComponent fileName={eng}/>
          <ImageComponent fileName={korEng} imageSrc={image}/>
          <ImageComponent fileName={korEng} imageSrc={image}/>
          <ImageComponent fileName={korEng} imageSrc={image}/>
          <ImageComponent fileName={korEng} imageSrc={image}/>
          <ImageComponent fileName={korEng} imageSrc={image2}/>
        </TabPanel>
      </TabPanels>
    </Tabs>
    // <AbsoluteCenter>
    //   <Box display="flex" width={400} height={120} justifyContent='space-between' alignItems="center">
    //     <ChakraLink _hover={{ textDecoration: "none" }} as={ReactRouterLink} to="/">
    //       <Icon as={FaCloudArrowUp} boxSize={85}/>
    //     </ChakraLink>
    //     <ChakraLink _hover={{ textDecoration: "none" }} as={ReactRouterLink} to="/">
    //       <Icon as={AiFillPicture} boxSize={85}/>
    //     </ChakraLink>
    //     <ChakraLink _hover={{ textDecoration: "none" }} as={ReactRouterLink} to="/">
    //       <Icon as={MdAddAPhoto} boxSize={85}/>
    //     </ChakraLink>
    //   </Box>
    // </AbsoluteCenter>
  )
}