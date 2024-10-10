import { Link as ReactRouterLink } from 'react-router-dom'
import { Icon, Link as ChakraLink} from '@chakra-ui/react'
import { BsPersonCircle } from "react-icons/bs";
import React from 'react'

export function MyPageMenu(): React.ReactElement {
  return (
    <ChakraLink
      _hover={{ textDecoration: "none" }}
      position='absolute'
      right={10}
      top={0}
      as={ReactRouterLink}
      to="/"
      display="inline-flex"
      alignItems="center"
      height="100%" // 부모 요소의 높이에 맞추기
    >
      <Icon as={BsPersonCircle} boxSize={70}/>
    </ChakraLink>
  )
}