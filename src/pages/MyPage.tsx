import React, { useEffect } from 'react'
import axios from 'axios'
import { Button, Flex, Icon, Input, Select, Text} from "@chakra-ui/react";
import {HiHashtag} from "react-icons/hi";
import {BackButton} from "../components/BackButton";
import { BASE_URL } from '../config/Config'
import { MyInfo } from '@types'
import useToastHandler from '../components/useToastHandler'

export const MyPage = ():React.JSX.Element => {
    const [userInfo, setUserInfo] = React.useState<MyInfo | null>(null);
    const [selectedModel, setSelectedModel] = React.useState<string>('');
    const showToast = useToastHandler();

    const handleFetch = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/mypage-view-model`, undefined, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
            });
            setUserInfo({
                userId: response.data.user_id,
                modelLists: response.data.model_list,
            })
        } catch (error) {
            showToast('유저 정보 불러오기 실패', '불러오기에 실패하였습니다.', 'error');
        }
    }

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModel(e.target.value)
    }

    // 모델 삭제 버튼 눌렀을 때 코드
    const handleDeleteModel = async (currentModel: string) => {
        try {
            const data = {
                model_name: currentModel
            }

            const response = await axios.delete(`${BASE_URL}/delete-model`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
                data: data
            })
            showToast('모델 삭제 성공', `${currentModel} 삭제 완료`, 'success');

            // 삭제시 페이지 리로드
            window.location.reload();
        } catch  (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 452) {
                    showToast('모델 삭제 실패', '기본 모델은 삭제할 수 없습니다', 'warning');
                }
                showToast('모델 삭제 실패', '모델 삭제에 실패하였습니다.', 'error');
            }
        }
    }

    useEffect( () => { // 서버로 부터 받아오는 코드
        // 서버로부터 모델 리스트를 받아오는 코드
        handleFetch();
    }, []);

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
                            value={userInfo?.userId}
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
                            onChange={handleChangeSelect}
                            sx={{
                                textAlign: 'center',
                                option: {
                                    textAlign: 'center',
                                    backgroundColor: 'transparent',
                                    fontWeight: '600'
                                },
                            }}>
                            {
                                userInfo?.modelLists.map((model) => (
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
                            onClick={() => handleDeleteModel(selectedModel)}
                        >
                            삭제
                        </Button>
                    </Flex>
                </Flex>

            </Flex>
        </Flex>
    )
}