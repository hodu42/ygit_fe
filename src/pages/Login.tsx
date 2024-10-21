import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  Link as ChakraLink,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { HiHashtag } from 'react-icons/hi'
import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

export const Login = () => {
  const [id, setId] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Flex bg='#F4F6F9' width='100%' height='100vh' alignItems='center'>
      <Flex width='55rem' height='45rem' flexDirection="column" bg="white" margin='0 auto'>
        <Flex flexDirection="column" width='80%' height='45rem' margin='0 auto'>
          <Flex alignItems='center' justifyContent='center' padding='3rem 0'>
            <Icon as={HiHashtag} boxSize={75} color="#0DCBE4" />
            <Text fontSize="2.5rem" fontWeight={900}>여기있태</Text>
          </Flex>
          <Flex flexDirection="column" alignItems='center'>
            <Text pl='2rem' width='80%' ml='2rem' fontSize='1.6rem' fontFamily='Pretendard' fontWeight='600'>ID</Text>
            <Input
              bg='#f4f6f9'
              borderColor='transparent'
              pl="3%"
              mt='1rem'
              width='80%'
              height="50px"
              placeholder="아이디를 입력하세요."
              fontSize="1.3rem"
              fontWeight={600}
              focusBorderColor="#0dcbe4"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </Flex>
          <Flex mt='4rem' flexDirection="column" alignItems='center'>
            <Text pl='2rem' width='80%' ml='2rem' fontSize='1.6rem' fontFamily='Pretendard' fontWeight='600'>PW</Text>
            <InputGroup width='80%' mt='1rem' position='relative'>
              <Input
                type={show ? 'text' : 'password'}
                bg='#f4f6f9'
                borderColor='transparent'
                pl="3%"
                pr='4.7rem'
                width='100%'
                height="50px"
                placeholder="비밀번호를 입력하세요."
                fontSize="1.3rem"
                fontWeight={600}
                focusBorderColor="#0dcbe4"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
              <InputRightElement
                width='4.5rem'
                height='50px'
                position='absolute'
                display='flex'
                alignItems='center'
              >
                <Button
                  h='40px'
                  bg='#e2e8f0'
                  onClick={()=> setShow(!show)}
                  _hover={{backgroundColor: '#cbd5e0'}}
                  fontSize='1.3rem'
                >
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Flex position='relative' justifyContent='center' alignItems='center' height='100%'>
            <Button
              bg='#0DCBE4'
              color='white'
              borderColor='transparent'
              fontSize="1.8rem"
              height='50px'
              _hover={{backgroundColor: '#0DA3E4'}}
              sx={{
                padding: '30px 80px'
              }}>
              Login
            </Button>
            <ChakraLink
              _hover={{ textDecoration: "underline" }}
              position='absolute'
              right='60px'
              as={ReactRouterLink}
              to="/register"
              display="inline-flex"
              color='#47484a'
            >
              <Text fontSize="2.2rem" >Register</Text>
            </ChakraLink>
          </Flex>
        </Flex>

      </Flex>
    </Flex>

  )
}