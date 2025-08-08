import Container from '../../Container';
import FileInput from '../FileInput';
import styles from "./styles.module.scss"
import strapped from 'modules/Core/higher-order-components/strapped';
import { EditNote } from "modules/Core/sub-modules/ui-kit/components/indicators";

const ImageValuePlaceholder = ({ value, onClear }) => {
    return (
        <Container className={styles.container}>
            <img src={value} width={10} height={10} alt={"circle"} />
            <Container onClick={onClear}>
                <EditNote />    
            </Container>
        </Container>
    )
}

const ImageInput = ({...props }) => (
    <FileInput
        {...props}
        ValueComponent={ImageValuePlaceholder}
    />
);

export default strapped(
    ImageInput,
    ({ onChange }) => {
        return {
            onChange: (file, base64) => onChange(base64)
        }
    }
);