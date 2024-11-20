import {
  Button,
  Flex,
  Icon,
  Input,
  Text,
  Link as ChakraLink,
  InputGroup,
  InputRightElement, useBreakpointValue
} from '@chakra-ui/react'
import { HiHashtag } from 'react-icons/hi'
import React from 'react'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../config/Config'
import qs from 'qs'
import useToastHandler from '../components/useToastHandler'

export const Login = ():React.JSX.Element => {
  const [id, setId] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  const showToast = useToastHandler();
  const isPhone = useBreakpointValue({base: true, xl: false})

  const handleLogin = async () => {

    try {
      const response = await axios.post(`${BASE_URL}/token`, qs.stringify({
        username: id,
        password: pw,
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token } = response.data;

      // 토큰을 로컬 스토리지에 저장하거나 상태 관리
      sessionStorage.setItem('token', access_token);

      // 로그인 성공 후 다른 페이지로 리디렉션할 수 있습니다.
      navigate('/');
    } catch (err: any) {
      showToast('로그인 실패', '로그인에 실패하였습니다.', 'error');
    }
  };

  return (
    <Flex width='100%' height='100vh' alignItems='center'>
      <Flex width={{base: '100%', lg: '45.83%'}} height={{base: '100%', lg: '75.55%'}} flexDirection="column" bg="white" borderRadius='10px' justifyContent='space-evenly' alignItems='center' margin={{base: '0', lg: '0 auto'}}>
        <Flex alignItems='center' justifyContent='center' mt={{base: '2rem'}}>
          <Icon as={HiHashtag} boxSize={{ base: '50px' }} color="#0DCBE4" />
          <Text fontSize={{base: '2.5rem'}} fontWeight={900} pr='20px'>LOGIN</Text>
        </Flex>
        <Flex flexDirection="column" width='80%' height='88.49%' justifyContent='space-evenly'>
          <Flex flexDirection="column" alignItems='center'>
            <Text pl='2rem' width='80%' ml='2rem' fontSize='1.6rem' fontFamily='Pretendard' fontWeight='600'>ID</Text>
            <Input
              bg='#f4f6f9'
              borderColor='transparent'
              pl="3%"
              mt='1rem'
              width='80%'
              height="50px"
              placeholder={isPhone ? '' : "아이디를 입력하세요."}
              fontSize={{base: '1.3rem'}}
              fontWeight={600}
              focusBorderColor="#0dcbe4"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onSubmit={handleLogin}
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
                placeholder={isPhone ? '' : "비밀번호를 입력하세요."}
                fontSize={{base:  '1.3rem'}}
                fontWeight={600}
                focusBorderColor="#0dcbe4"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
              <InputRightElement
                display='flex'
                width='4.5rem'
                height='50px'
                position='absolute'
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
          <Flex position='relative' flexDirection='column' height={{base: '230px',}} justifyContent='space-evenly' alignItems='center'>
            <Button
              bg='#0DCBE4'
              color='white'
              borderColor='transparent'
              fontSize="1.8rem"
              maxHeight='50px'
              height={{base: '9.6%'}}
              _hover={{backgroundColor: '#0DA3E4'}}
              onClick={handleLogin}
              sx={{
                padding: '30px 80px'
              }}>
              Login
            </Button>
            <ChakraLink
              _hover={{ textDecoration: "underline" }}
              as={ReactRouterLink}
              to="/register"
              display="inline-flex"
              color='#47484a'
            >
              <Text fontSize="1.8rem" >Register</Text>
            </ChakraLink>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}