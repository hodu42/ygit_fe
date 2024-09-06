import { Center, Icon, Text, Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { HiHashtag } from 'react-icons/hi';

export function MainLogo() {
  return (
    <ChakraLink _hover={{ textDecoration: "none" }} as={ReactRouterLink} to="/" display="inline-flex">
        <Icon mr={2} as={HiHashtag} boxSize={75} color="#0DCBE4"/>
        <Center height={73}>
          <Text fontSize="2.5rem" fontWeight={900}>여기있태</Text>
        </Center>
    </ChakraLink>
  )
}
