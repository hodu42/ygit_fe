import React from "react";
import { Button, Flex, Icon, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import {HiHashtag} from "react-icons/hi";
import {BackButton} from "../components/BackButton";
import axios, { AxiosResponse } from 'axios'
import { BASE_URL } from '../config/Config'
import { useNavigate } from 'react-router-dom'

export const Register = (): React.JSX.Element => {
  const [id, setId] = React.useState<string>('')
  const [pw, setPw] = React.useState<string>('')
  const [valid, setValid] = React.useState<boolean>(false)
  const [show, setShow] = React.useState<boolean>(false)
  const navigate = useNavigate();

  const handleRegister = async () => {
    let response: AxiosResponse<any, any>;
    try {
      response = await axios.post(`${BASE_URL}/register`, {
        id: id,
        password: pw,
      })

      const { access_token } = response.data

      // 토큰을 세션 스토리지에 저장하거나 상태 관리
      sessionStorage.setItem('token', access_token)

      // 로그인 성공 후 다른 페이지로 리디렉션할 수 있습니다.
      navigate('/');
    } catch (err: any) {
        alert("잘못된 입력값입니다.");
    }
  }

  return (
    <Flex bg="#F4F6F9" width="100%" height="100vh" alignItems="center">
      <Flex
        position="relative"
        width="55rem"
        height="45rem"
        flexDirection="column"
        bg="white"
        margin="0 auto"
        borderRadius="10px"
        justifyContent="center"
        alignItems="center"
      >
        <BackButton />
        <Flex flexDirection="column" width="80%">
          <Flex alignItems="center" justifyContent="center" pb="3rem">
            <Icon as={HiHashtag} boxSize={75} color="#0DCBE4" />
            <Text fontSize="2.5rem" fontWeight={900}>
              Register
            </Text>
          </Flex>
          <Flex flexDirection="column" alignItems="center">
            <Text pl="2rem" width="80%" ml="2rem" fontSize="1.6rem" fontFamily="Pretendard" fontWeight="600">
              ID
            </Text>
            <InputGroup width="80%" mt="1rem" position="relative">
              <Input
                type="text"
                bg="#f4f6f9"
                borderColor="transparent"
                pl="3%"
                pr="4.7rem"
                width="100%"
                height="50px"
                placeholder="사용하실 아이디를 입력하세요."
                fontSize="1.3rem"
                fontWeight={600}
                focusBorderColor="#0dcbe4"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <InputRightElement width="4.5rem" height="50px" position="absolute" display="flex" alignItems="center">
                <Button
                  h="40px"
                  bg={valid ? '#04AA6D' : '#f44336'}
                  onClick={() => setValid(!valid)}
                  _hover={{ bg: '<color>' }}
                  fontSize="1.3rem"
                  color="white"
                >
                  Check
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Flex mt="4rem" flexDirection="column" alignItems="center">
            <Text pl="2rem" width="80%" ml="2rem" fontSize="1.6rem" fontFamily="Pretendard" fontWeight="600">
              PW
            </Text>
            <InputGroup width="80%" mt="1rem" position="relative">
              <Input
                type={show ? 'text' : 'password'}
                bg="#f4f6f9"
                borderColor="transparent"
                pl="3%"
                pr="4.7rem"
                width="100%"
                height="50px"
                placeholder="사용하실 비밀번호를 입력하세요."
                fontSize="1.3rem"
                fontWeight={600}
                focusBorderColor="#0dcbe4"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
              <InputRightElement width="4.5rem" height="50px" position="absolute" display="flex" alignItems="center">
                <Button
                  h="40px"
                  bg="#e2e8f0"
                  onClick={() => setShow(!show)}
                  _hover={{ backgroundColor: '#cbd5e0' }}
                  fontSize="1.3rem"
                >
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
          <Flex position="relative" justifyContent="center" alignItems="center" pt="5rem">
            <Button
              bg="#0DCBE4"
              color="white"
              borderColor="transparent"
              fontSize="1.8rem"
              height="50px"
              _hover={{ backgroundColor: '#0DA3E4' }}
              onClick={handleRegister}
              sx={{
                padding: '30px 80px',
              }}
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}