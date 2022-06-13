/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export default function useDebounceValue(input: string = '', waitingTime: number = 500) {
    const [value, setValue] = useState(input);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setValue(input);
        }, waitingTime);
        return () => {
            clearTimeout(timeout);
        };
    }, [input]);
    return { value };
}
