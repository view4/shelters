import { useCallback, useState } from 'react';
import styles from "./styles.module.scss";
import Input from '../Input';
import Container from '../Container';
import Tag from '../Tag';

const MultiTextInput = ({setValue, label, value = [], inputProps, renderValue=defaultRenderValue}) => {
    const [input, setInput] = useState();

    const handleDeleteTag = (_, i) => {
        let tags = value.slice();
        tags.splice(i,1)
        return setValue(tags)
    }

    const onKeyUp = useCallback((e) => {
        if (e.key !== "Enter") return;
        setValue([...value, input])
        setInput("")
    }, [input, value, setValue])

    return (
        <Container className={styles.container} >
        <Input 
            value={input} 
            label={label}
            onChange={setInput} 
            onKeyUp={onKeyUp} 
            {...inputProps}
        />
        <Container>
            {renderValue(value, {onDelete: handleDeleteTag})}
        </Container>
    </Container>
    )
};

const defaultRenderValue = (value, {onDelete}) => value?.map((t, i) => <Tag key={i} onDelete={() => onDelete(value, i)} text={t}>{t}</Tag>)



export default MultiTextInput;