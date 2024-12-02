import { useToast } from '@chakra-ui/react';

const useToastHandler = () => {
  const toast = useToast();

  const showToast = (title: string, description: string, status: 'success' | 'error' | 'warning' | 'loading') => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 6000,
      isClosable: true,
    });
  };

  return showToast;
};

export default useToastHandler;