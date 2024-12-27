import { useCallback } from "react";
import useOnError from "modules/Core/sub-modules/Dialog/hooks/useOnError";
import { useNavigate } from "react-router-dom";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";

export default (props, validator, options = {}) => {
    const navigate = useNavigate();
    const onError = useOnError()
    const validate = useCallback(() => {
        if (validator(props)) {
            onError(options?.error?.text)
            navigate(options?.redirect)
            return
        };
    })
    useOnLoad(validate, options?.deps)
}
