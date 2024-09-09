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
import { MainLogo } from './MainLogo'

export function IconMenus() {
  return (
    <Tabs isLazy align="center" defaultIndex={1} variant="unstyled">
      <TabList display="flex" width={400} height={120} justifyContent="space-between">
        <Tab _selected={{ color: '#0dcbe4' }}><Icon as={FaCloudArrowUp} boxSize={85}/></Tab>
        <Tab _selected={{ color: '#0dcbe4' }}><Icon as={AiFillPicture} boxSize={85}/></Tab>
        <Tab _selected={{ color: '#0dcbe4' }}><Icon as={MdAddAPhoto} boxSize={85}/></Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <MainLogo/>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <MainLogo/>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <MainLogo/>
          <p>three!</p>
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