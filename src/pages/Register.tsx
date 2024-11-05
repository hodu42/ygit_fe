import React from "react";
import {Button, Flex, Icon, Input, InputGroup, InputRightElement, Text, Link as ChakraLink} from "@chakra-ui/react";
import {HiHashtag} from "react-icons/hi";
import {Link as ReactRouterLink } from "react-router-dom";
import {TbArrowBackUp} from "react-icons/tb";
import {BackButton} from "../components/BackButton";

export const Register = ():React.JSX.Element => {
    const [id, setId] = React.useState('');
    const [pw, setPw] = React.useState('');
    const [valid, setValid] = React.useState(false);
    const [show, setShow] = React.useState(false);

    return (
        <Flex bg='#F4F6F9' width='100%' height='100vh' alignItems='center'>
            <Flex position='relative' width='55rem' height='45rem' flexDirection="column" bg="white" margin='0 auto' borderRadius='10px' justifyContent='center' alignItems='center'>
                <BackButton/>
                <Flex flexDirection="column" width='80%'>
                    <Flex alignItems='center' justifyContent='center' pb='3rem'>
                        <Icon as={HiHashtag} boxSize={75} color="#0DCBE4" />
                        <Text fontSize="2.5rem" fontWeight={900}>Register</Text>
                    </Flex>
                    <Flex flexDirection="column" alignItems='center'>
                        <Text pl='2rem' width='80%' ml='2rem' fontSize='1.6rem' fontFamily='Pretendard' fontWeight='600'>ID</Text>
                        <InputGroup width='80%' mt='1rem' position='relative'>
                            <Input
                                type='text'
                                bg='#f4f6f9'
                                borderColor='transparent'
                                pl="3%"
                                pr='4.7rem'
                                width='100%'
                                height="50px"
                                placeholder="사용하실 아이디를 입력하세요."
                                fontSize="1.3rem"
                                fontWeight={600}
                                focusBorderColor="#0dcbe4"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
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
                                    bg={valid ? '#04AA6D' : '#f44336'}
                                    onClick={()=> setValid(!valid)}
                                    _hover={{bg: '<color>'}}
                                    fontSize='1.3rem'
                                    color='white'
                                >
                                    Check
                                </Button>
                            </InputRightElement>
                        </InputGroup>
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
                                placeholder="사용하실 비밀번호를 입력하세요."
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
                    <Flex position='relative' justifyContent='center' alignItems='center' pt='5rem'>
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
                            Register
                        </Button>
                    </Flex>
                </Flex>

            </Flex>
        </Flex>
    )
}