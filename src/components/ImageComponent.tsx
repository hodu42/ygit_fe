import { Box, Text, Image, Link as ChakraLink} from '@chakra-ui/react'
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Image as ImageType } from "@types"

export function ImageComponent({ id, name, src, tags }: ImageType) {
  // 파일 이름과 확장자 분리
  const parts = name.split('.');
  const extension = parts.length > 1 ? parts.pop() : ''; // 확장자가 없을 경우 빈 문자열
  const fileNameWithoutExtension = parts.join('.'); // 파일 이름 부분

  // 최대 글자 수 설정
  const maxFileNameLength = 16; // 최대 글자 수

  return (
    <ChakraLink
      as={ReactRouterLink}
      to={src}
      display="inline-flex"
      alignItems="center"
    >
      <Box width={200} display='flex' justifyContent='center' alignItems='center'>
        <Box width={200} height={220} display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
          <Image width={200} height={120} objectFit="contain" src={src} alt={name}/>
          <Text fontSize="1.2rem">
            {fileNameWithoutExtension.length > maxFileNameLength
              ? `${fileNameWithoutExtension.slice(0, maxFileNameLength)}...`
              : fileNameWithoutExtension
            }
            {extension && `.${extension}`} {/* 확장자가 있을 경우만 표시 */}
          </Text>
        </Box>
      </Box>
    </ChakraLink>
  );
}
