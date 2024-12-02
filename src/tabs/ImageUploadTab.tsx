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
  const [currentImageSrc, setCurrentImageSrc] = useState<string>('');
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
    } catch (error) {
      showToast('이미지 업로드 실패', '업로드에 실패하였습니다.', 'error');
    }
  }

  // 이미지로부터 태그 리스트를 가져오는 코드
  const getTagsFromImg = async (imageName: string) => {
    const image = {
      image_name: imageName
    }
    try {
      const response = await axios.post(`${BASE_URL}/extract-tags`, image, {
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

  const handleUploadAndExtractTags = async (files: FileList) => {
    if (files && files.length > 0) {
      const file = files[0];
      try {
        // uploadedImage = 원본 이미지 이름
        const uploadedImage = await handleImageUpload(file);
        const tags = await getTagsFromImg(uploadedImage);

        // 이미지 미리보기를 위한 createObjectURL
        const previewImage = window.URL.createObjectURL(file);
        setResultImage({
          name: file.name,
          src: previewImage,
          tags: tags, // 필요할 경우 태그 설정
        });
        setCurrentImageSrc(uploadedImage);

        showToast('업로드 완료', '이미지 업로드에 성공하였습니다.', 'success');
      } catch (any) {
        showToast('업로드 실패', '이미지 업로드에 실패하였습니다.', 'error');
      }
    }
  }

  // 드래그로 이미지 업로드 했을 때 실행하는 코드
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // img가 존재할 경우 드롭 이벤트를 무시
    if (resultImage) return;
    const {files} = e.dataTransfer;
    if (files && files.length > 0) {
      handleUploadAndExtractTags(files)
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
      handleUploadAndExtractTags(files)
    }
  }
  // 삭제버튼 눌렀을 때 코드
  const handleDeleteImage = async (currentImageSrc: string) => {
    try {
      const data = {
        image_name: currentImageSrc
      }
      const response = await axios.delete(`${BASE_URL}/delete-image`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        data: data
      })
      showToast('이미지 삭제 성공', `${resultImage?.name} 삭제 완료`, 'success');
      // resultImage 초기화
      setResultImage(null);
      setCurrentImageSrc('');
    } catch  (error) {
      showToast('이미지 삭제 실패', '이미지 삭제에 실패하였습니다.', 'error');
    }
  }

  return (
    <Box display='flex' justifyContent='center' alignItems='center' width='100%' height='100%'>
      {/* 이미지가 없으면 업로드화면 / 있으면 이미지 보여줌 */}
      {resultImage ?
        <ImagePreview img={resultImage} onClick={() => handleDeleteImage(currentImageSrc)}/>
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