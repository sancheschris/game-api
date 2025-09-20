import React from "react";
import { styled } from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  //   z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border: 1px solid #d3d3d3;
  padding: 0.5rem 1rem 1rem 1rem;
  max-width: 500px;
  width: 90%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #666;
  }
`;

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ onClose, children }: ModalProps): React.ReactElement => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
