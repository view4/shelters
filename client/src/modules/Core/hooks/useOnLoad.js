import { useEffect } from "react"

export const useOnLoad =  (onLoad, shouldLoad = true, deps = []) => {
    useEffect(() => {
        shouldLoad && onLoad?.()
    }, deps)
}