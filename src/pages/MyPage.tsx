import React from "react";
import {Box, Button, Flex, Icon, Input, InputGroup, InputRightElement, Select, Text} from "@chakra-ui/react";
import {HiHashtag} from "react-icons/hi";
import {BackButton} from "../components/BackButton";

export const MyPage = () => {
    const [id, setId] = React.useState('hodu42');
    const [pw, setPw] = React.useState('');
    const [valid, setValid] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const modelList = ['모델1', '모델2', '모델3'];
    return (
        <Flex bg='#F4F6F9' width='100%' height='100vh' alignItems='center'>
            <Flex position='relative' width='55rem' height='45rem' flexDirection="column" bg="white" margin='0 auto' borderRadius='10px' justifyContent='center' alignItems='center'>
                <BackButton/>
                <Flex flexDirection="column" width='80%'>
                    <Flex alignItems='center' justifyContent='center' pb='3rem'>
                        <Icon as={HiHashtag} boxSize={75} color="#0DCBE4" />
                        <Text fontSize="2.5rem" fontWeight={900}>My Page</Text>
                    </Flex>
                    <Flex alignItems='center' justifyContent='center'>
                        <Text display='inline-block' textAlign='right' minWidth='148px'  mr='4rem' fontSize='1.6rem' fontFamily='Pretendard' fontWeight='600'>ID</Text>
                        <Input
                            type='text'
                            bg='#f4f6f9'
                            borderColor='transparent'
                            width='40%'
                            height="50px"
                            fontSize="1.5rem"
                            fontWeight={600}
                            focusBorderColor="#0dcbe4"
                            value={id}
                            isDisabled
                            textAlign='center'
                        />
                    </Flex>
                    <Flex mt='4rem' alignItems='center' justifyContent='center'>
                        <Text minWidth='148px' mr='4rem' fontSize='1.6rem' fontFamily='Pretendard' fontWeight='600'>생성한 모델들</Text>
                        <Select
                            width='30%'
                            height='50px'
                            mr='20px'
                            bg='#0DCBE4'
                            color='white'
                            borderColor='none'
                            fontSize="1.5rem"
                            fontFamily='Pretendard'
                            fontWeight={600}
                            sx={{
                                textAlign: 'center',
                                option: {
                                    textAlign: 'center',
                                    backgroundColor: 'transparent',
                                    fontWeight: '600'
                                },
                            }}>
                            {
                                modelList.map((model) => (
                                    <option value={model}>{model}</option>
                                ))
                            };
                        </Select>
                        <Button
                            h='50px'
                            bg='#f44336'
                            _hover={{bg: '#ff0000'}}
                            fontSize='1.3rem'
                            color='white'
                        >
                            삭제
                        </Button>
                    </Flex>
                </Flex>

            </Flex>
        </Flex>
    )
}