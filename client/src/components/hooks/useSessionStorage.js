import { useEffect, useState } from "react";

export const useSessionStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        const jsonValue = sessionStorage.getItem(key);
        if (jsonValue != null && jsonValue != "undefined") {
            return JSON.parse(jsonValue);
        }

        if (typeof initialValue === "function") {
            return initialValue();
        } else {
            return initialValue;
        }
    })

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}