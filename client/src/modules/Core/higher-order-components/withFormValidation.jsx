import useOnError from "../sub-modules/Dialog/hooks/useOnError";
import { validateRequired } from "../utils/validators";
import { minLengthValidator } from "../utils/validators/string";

const defaultOptions = {
    submitPropKey: "handleSubmit"
}

export default (Component, validationSchema = {}, options = defaultOptions) => (props) => {
    const { submitPropKey } = options;

    const onError = useOnError();

    const handleValidation = (data) => {
        const errors = Object.entries(validationSchema).map(([key, { required, minLength, validator, readableKey = key }]) => {
            const value = data[key];
            if (required && !validateRequired(value)) return `${key} is required`;
            if (minLength && !minLengthValidator(value, minLength)) return `${readableKey} must be at least ${minLength} characters long`;
            return validator?.(value);
        }).filter(Boolean);

        return errors
    }

    const _handleSubmit = (data) => {
        const [error] = handleValidation(data);
        if (Boolean(error)) {
            onError(error)
            return { error }
        };
        return props[submitPropKey](data);
    }

    return <Component {...props} {...({ [submitPropKey]: _handleSubmit })} />

}
