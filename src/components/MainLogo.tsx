import { Icon, Text, Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { HiHashtag } from 'react-icons/hi';
import React from 'react'

export function MainLogo():React.ReactElement {
  return (
    <ChakraLink
      _hover={{ textDecoration: "none" }}
      position='absolute'
      left={10}
      top={0}
      as={ReactRouterLink}
      to="/"
      display="inline-flex"
      alignItems="center"
      height="100%" // 부모 요소의 높이에 맞추기
    >
      <Icon mr={2} as={HiHashtag} boxSize={75} color="#0DCBE4" />
      <Text fontSize="2.5rem" fontWeight={900}>여기있태</Text>
    </ChakraLink>
  )
}
