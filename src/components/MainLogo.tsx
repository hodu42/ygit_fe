import { Icon, Text, Link as ChakraLink } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { HiHashtag } from 'react-icons/hi';

export function MainLogo() {
  return (
    <ChakraLink height={120} _hover={{ textDecoration: "none" }} as={ReactRouterLink} to="/" display="inline-flex" alignItems="center">
        <Icon mr={2} as={HiHashtag} boxSize={82} color="#0DCBE4"/>
          <Text fontSize="3rem" fontWeight={900}>여기있태</Text>
    </ChakraLink>
  )
}
