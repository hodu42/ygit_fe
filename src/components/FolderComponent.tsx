import { IoMdFolder } from "react-icons/io";
import { Box, Icon, Text, Link as ChakraLink } from '@chakra-ui/react'
import React from 'react';

interface FolderComponentProps {
  folderName: string;
  onClick: () => void;
}

export function FolderComponent({ folderName, onClick}: FolderComponentProps) {
  return (
    <ChakraLink onClick={onClick}>
      <Box width={200} display="flex" justifyContent='center' alignItems='center' _hover={{
        cursor: 'pointer'
      }}>
        <Box width={200}
             height={220}
             display="flex"
             flexDirection="column"
             justifyContent="space-evenly"
             alignItems="center">
          <Icon as={IoMdFolder}
                width={200}
                height={120}
                color="#0dcbe4"
                _hover={{color: '#0DA3E4'}}
                transition='color 0.2s ease'
          />
          <Text fontSize="1.2rem" fontWeight={900} noOfLines={2} maxWidth="100%">
            {folderName}
          </Text>
        </Box>
      </Box>
    </ChakraLink>
  );
}
