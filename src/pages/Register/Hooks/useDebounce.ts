import { useState, useEffect } from "react";

const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)

        return () => {
            clearTimeout(timeOutId)
        }
    }, [value, delay]);

    return debouncedValue

}

export default useDebounce