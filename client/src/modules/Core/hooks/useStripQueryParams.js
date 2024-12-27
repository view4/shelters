import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";


export const useQueryParams = ({shouldStrip = false} = {}) => {   
    const [params, setParams] = useState({}); 
    const location = useLocation();
    const navigate = useNavigate();
    
    const onLoad = useCallback(() => {
        const params = new URLSearchParams(location.search);
        params.keys().forEach(key => {
            const value = params.get(key);
            value && setParams(params => ({
                ...params,
                [key]: value
            }))
        });
        shouldStrip && navigate(location.pathname)
    }, [location])
    
    useOnLoad(onLoad, Boolean(location?.search), [location?.search])

    return params;
}

export default  () => useQueryParams({shouldStrip: true});