import { Box, Text, Image} from '@chakra-ui/react'
import React from 'react';

interface FileNameProps {
  fileName: string,
  imageSrc: string,
}

export function ImageComponent({ fileName, imageSrc }: FileNameProps) {
  // 파일 이름과 확장자 분리
  const parts = fileName.split('.');
  const extension = parts.length > 1 ? parts.pop() : ''; // 확장자가 없을 경우 빈 문자열
  const fileNameWithoutExtension = parts.join('.'); // 파일 이름 부분

  // 최대 글자 수 설정
  const maxFileNameLength = 16; // 최대 글자 수

  return (
    <Box width={200} height={220} display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center" borderWidth={2}>
      <Image width={200} height={120} objectFit="contain" src={imageSrc} alt={fileName}/>

      <Text fontSize="1.2rem" fontWeight={900}>
        {fileNameWithoutExtension.length > maxFileNameLength
          ? `${fileNameWithoutExtension.slice(0, maxFileNameLength)}...`
          : fileNameWithoutExtension
        }
        {extension && `.${extension}`} {/* 확장자가 있을 경우만 표시 */}
      </Text>
    </Box>
  );
}
