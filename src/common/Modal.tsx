/** @format */

import React, { useEffect } from "react";
import ModalContainer from "./ModalContainer";

interface ModalProps {
  children: React.ReactNode;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ children, setModal }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return (
    <div
      className={` w-screen h-screen fixed left-0 right-0 bottom-0 top-0 flex flex-col justify-center items-center bg-black bg-opacity-90 px-2 z-50`}
    >
      <ModalContainer setModal={setModal}>{children}</ModalContainer>
    </div>
  );
};

export default Modal;
