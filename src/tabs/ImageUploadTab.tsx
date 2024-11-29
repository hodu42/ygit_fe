import { Box } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { ImgIdx, ResultImage } from '@types'
import axios from 'axios'
import { BASE_URL } from '../config/Config'
import useToastHandler from '../components/useToastHandler'
import { ImagePreview } from '../components/ImagePreview'
import { ImageUpload } from '../components/ImageUpload'

// 파일 업로드 화면 컴포넌트
export function ImageUploadTab():React.JSX.Element {

  const [resultImage, setResultImage] = useState<ResultImage | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const showToast = useToastHandler();

  // 파일을 업로드 하는 코드
  const handleImageUpload = async (file: Blob) => {
    // FormData 객체 생성
    const formData = new FormData()
    formData.append('file', file)
  
    try {
      const response = await axios.post(`${BASE_URL}/upload-image`, formData, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      return response.data;
      // 서버에서 반환된 데이터 처리
    } catch (error) {
      showToast('이미지 업로드 실패', '업로드에 실패하였습니다.', 'error');
    }
  }

  // 이미지로부터 태그 리스트를 가져오는 코드
  const getTagsFromImg = async (pictureId: number) => {

    try {
      const response = await axios.post(`${BASE_URL}/extract-tags`, pictureId, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      return response.data
      // 서버에서 반환된 데이터 처리
    } catch (error) {
      showToast('태그 추출 실패', '이미지의 태그 추출에 실패하였습니다.', 'error');
    }
  }

  // 이미지 드롭했을 때 발생하는 이벤트 코드
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // img가 존재할 경우 드롭 이벤트를 무시
    if (resultImage) return;
    const {files} = e.dataTransfer;

    if (files && files.length > 0) {
      const file = files[0];
      try {
        const uploadedImage = await handleImageUpload(file);
        const tags = await getTagsFromImg(uploadedImage.id);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onloadend = () => {
          // reader.result가 string일 때만 상태 업데이트
          if (typeof reader.result === 'string' && tags) {
            // 통신으로 가져온 이미지객체를 setImg하기
            setResultImage({
              name: file.name,
              image: reader.result,
              tags: tags, // 필요할 경우 태그 설정
            });
            showToast('업로드 완료', '이미지 업로드에 성공하였습니다.', 'success');
          }
        };
      } catch (any) {
        showToast('업로드 실패', '이미지 업로드에 실패하였습니다.', 'error');
      }
    }
  }

  // 브라우저의 기본 이벤트 없애기
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const onUploadImageBtnClick = () => {
    inputRef.current?.click();
  };

  // 버튼으로 이미지 업로드 했을 때 실행하는 코드
  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
  
    if (files && files.length > 0) {
      const file = files[0];
  
      try {
        const uploadedImage = await handleImageUpload(file);
        const tags = await getTagsFromImg(uploadedImage.id);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onloadend = () => {
          console.log('FileReader completed');  // FileReader 완료 확인
          if (typeof reader.result === 'string' && tags) {
            // 통신으로 가져온 이미지객체를 setImg하기
            setResultImage({
              name: file.name,
              image: reader.result,
              tags: tags, // 필요할 경우 태그 설정
            });
            showToast('업로드 완료', '이미지 업로드에 성공하였습니다.', 'success');
          } else {
            throw new Error('Invalid reader result or tags');
          }
        };
  
        reader.onerror = (error) => {
          console.error('FileReader error:', error);  // FileReader 에러 로깅
          throw error;
        };
  
      } catch(error) {
        console.error('Upload process error:', error);  // 전체 프로세스 에러 로깅
        showToast('업로드 실패', '이미지 업로드에 실패하였습니다.', 'error');
      }
    }
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
      {/* 이미지가 없으면 업로드화면 / 있으면 이미지 보여줌 */}
      {resultImage ?
        <ImagePreview img={resultImage}/>
        :
        <ImageUpload
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onUploadImageBtnClick={onUploadImageBtnClick}
          inputRef={inputRef}
          onUploadImage={onUploadImage}
        />
      }
    </Box>
  );
}