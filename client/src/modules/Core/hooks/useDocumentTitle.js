import { useRef, useEffect } from "react";


export default (title, options = {}) => {
    const prev = useRef(document.title);

    useEffect(() => {
        if (title) document.title = title;
        return () => {
          if (options.restoreOnUnmount) document.title = prev.current;
        };
      }, [title, options.restoreOnUnmount]);
}   