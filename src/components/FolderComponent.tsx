import { IoMdFolder } from "react-icons/io";
import { Box, Icon, Text} from '@chakra-ui/react'
import React from 'react';

interface FileNameProps {
  fileName: string;
}

export function FolderComponent({ fileName }: FileNameProps) {
  return (
    <Box width={200} height={220} display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center" borderWidth={2}>
      <Icon as={IoMdFolder} width={200} height={120} color="#0dcbe4" />

        <Text fontSize="1.2rem" fontWeight={900} noOfLines={2} maxWidth="100%">
          {fileName}
        </Text>
    </Box>
  );
}
