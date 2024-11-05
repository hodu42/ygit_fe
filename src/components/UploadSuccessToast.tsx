import { ToastMethods, useToast } from '@chakra-ui/react'

export function UploadSuccessToast():{ uploadToast: () => void } {
  const toast = useToast()

  const uploadToast = () => {
    toast({
      title: '업로드 완료',
      description: '이미지 업로드에 성공하였습니다.',
      status: 'success',
      duration: 6000,
      isClosable: true,
    })
  }
  return { uploadToast }
}