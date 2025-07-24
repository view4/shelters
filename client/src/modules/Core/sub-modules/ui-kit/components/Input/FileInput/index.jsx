import cx from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';
import Container from '../../Container';
import styles from "./styles.module.scss";


export const FileInput = ({ onChange, ValueComponent, className, ...props }) => {
    const ref = useRef();
    const [shouldTriggerInput, setShouldTriggerInput] = useState(false);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            onChange(file, reader.result);
        }
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (shouldTriggerInput) {
            ref?.current?.click();
            setShouldTriggerInput(false);
        }
    }, [shouldTriggerInput, ref?.current]);

    const clear = useCallback(() => {
        onChange(null, null)
        setShouldTriggerInput(true);
    }, [onChange, ref?.current]);

    if (ValueComponent && props.value) return <ValueComponent onClear={clear} value={props.value} />
    return (
        <Container
            className={cx(styles.container, className)}
            onClick={() => setShouldTriggerInput(true)}
        >
            <input
                {...props}
                onChange={handleFileChange}
                type="file"
                ref={ref}
            />
        </Container>

    )
}
export default FileInput;