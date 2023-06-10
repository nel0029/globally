import React, { ReactNode } from 'react'

interface CancelButtonProps {
  onClick: (() => void)[],
  children: ReactNode,
  className?: string
}

const CancelButton: React.FC<CancelButtonProps> = ({ onClick, children, className }) => {
  const handleOnClick = () => {
    onClick.forEach((func) => {
      if (typeof func === 'function') {
        func();
      }
    });
  };
  return (
    <button
      onClick={handleOnClick}
      className={`${className ? className : 'rounded-full  px-5 py-1'} border-2 border-slate-400`}>
      {children}
    </button>
  )
}

export default CancelButton