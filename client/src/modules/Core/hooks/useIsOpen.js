import { useState } from "react"

export const useIsOpen = (initalValue = false)  =>{
    const [isOpen, setIsOpen] = useState(initalValue);
    return {
        isOpen,
        setIsOpen, 
        toggle: () => setIsOpen(!isOpen), 
        open:() => setIsOpen(true), 
        close: () => setIsOpen(false) 
    }
}