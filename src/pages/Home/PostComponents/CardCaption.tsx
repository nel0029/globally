import React from 'react'


interface CardCaptionProps {
    caption?: string
}

const CardCaption: React.FC<CardCaptionProps> = ({ caption }) => {
    const captionLines = caption?.split('\n');
    return (
        <div className=''>
            {captionLines?.map((line, index) => (
                <p key={index} className='text-[1rem] leading-5 break-words'>
                    {line}
                </p>
            ))}

        </div>
    )
}

export default CardCaption