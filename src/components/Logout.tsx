import { Link as ChakraLink } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export const Logout = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <ChakraLink
      _hover={{ color: '#0dcbe4' }}
      position='absolute'
      right='10rem'
      top={0}
      onClick={handleLogout}
      display="inline-flex"
      alignItems="center"
      height="100%" // 부모 요소의 높이에 맞추기
      fontSize="1.3rem"
      fontWeight={900}
      cursor='pointer'
    >
      로그아웃
    </ChakraLink>
  )
}