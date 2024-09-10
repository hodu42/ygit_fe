import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { IoSearchSharp } from "react-icons/io5";
import React from 'react'

export function SearchBox() {
  return (
    <InputGroup>
      <InputLeftElement width="5%" height="60px" pointerEvents="none">
        <Icon as={IoSearchSharp} boxSize="45px" color="#0dcbe4" />
      </InputLeftElement>
      <Input pl="5%" height="60px" placeholder="검색할 태그를 입력하세요" fontSize="1.3rem" fontWeight={600} focusBorderColor="#0dcbe4"/>
    </InputGroup>
  )
}