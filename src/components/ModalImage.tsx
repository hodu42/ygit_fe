import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react'
import { ModalImagePreview } from '../components/ModalImagePreview'
import React from 'react'
import { ResultImage } from '@types'

type ModalImageProps = {
  isOpen: boolean;
  handleClose: () => void;
  modalImage: ResultImage | null;
}

export const ModalImage = ({isOpen, handleClose, modalImage}: ModalImageProps) => {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent minWidth='60%' height='85%'>
        <ModalCloseButton />
        <ModalBody padding={0}>
          {modalImage ? (
            <ModalImagePreview img={modalImage}/>
          ) : (
            <p>데이터를 불러오는 중입니다...</p>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}