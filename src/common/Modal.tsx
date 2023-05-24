import React from 'react';
import ModalContainer from './ModalContainer';

interface ModalProps {
    children: React.ReactNode;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ children, setModal }) => {
    return (
        <div className='fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 right-0 left-0 top-0 bottom-0 z-20 px-2'>
            <ModalContainer setModal={setModal}>{children}</ModalContainer>
        </div>
    );
};

export default Modal;
