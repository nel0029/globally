import React from 'react'

interface TextAreaInputProps {
    body: string,
    setBody: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ body, setBody, placeholder }) => {
    return (

        <textarea
            maxLength={99}
            value={body}
            onChange={(event: any) => setBody(event.target.value)}
            className='bg-white dark:bg-Dark200 border rounded-lg dark:border-Dark300 outline-none bg-transparent dark:text-textDark w-full h-[75px] resize-none py-1 px-2'
            placeholder={placeholder}
        />

    )
}

export default TextAreaInput