import { Link as ReactRouterLink } from 'react-router-dom'
import { Icon } from '@chakra-ui/react'
import { FaTrashCan } from 'react-icons/fa6'
import { Link as ChakraLink } from '@chakra-ui/react'
import React from 'react'

type DeleteButtonProps = {
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const DeleteButton = ({ onClick }: DeleteButtonProps) => {

  return (
    <ChakraLink
      as={ReactRouterLink}
      onClick={onClick}
      display="inline-flex"
      position='absolute'
      top={8}
      right={10}
    >
      <Icon as={FaTrashCan} boxSize={{base : 41, xl: 55, '2xl': 70}} color='#f43535'/>
    </ChakraLink>
  )
}