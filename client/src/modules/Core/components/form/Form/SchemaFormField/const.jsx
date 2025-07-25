import { useCallback } from "react";
import Input, { InputLabel } from "modules/Core/sub-modules/ui-kit/components/Input"
import SchemaFormArrayField from "./SchemaFormArrayField"
import AsyncSelect from "modules/Core/sub-modules/ui-kit/components/Input/AsyncSelect"
import ImageInput from "modules/Core/sub-modules/ui-kit/components/Input/ImageInput";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
// import UsersField from "../../UsersField";
import ObjectField from "../../ObjectField";
import styles from "./styles.module.scss";

const ImagesField = ({ fields, value = [], onChange, label, renderValueItem, submitButtonText, ...props }) => {
    const onSubmit = useCallback((val) => onChange([
        ...(value ?? []),
        val,
    ]), [onChange, value]);

    return (
        <Container>
            <InputLabel label={label} />
            <Container flex row maxWidth className={styles.imagesInputInnerContainer}>
                {value?.map(image => (
                    <ImageInput value={image} onChange={onChange} />
                ))}
                <ImageInput className={styles.imagesInput} onChange={onSubmit} />
            </Container>
        </Container>
    )
};

export const COMPONENT_TYPE_TREE = {
    text: Input,
    string: Input,  
    array: SchemaFormArrayField,
    textarea: (props) => <Input {...props} textarea />,
    image: (props) => <Input containerClassName={styles.imageSchemaFormField} {...props} image />,
    images: ImagesField,
    file: (props) => <Input {...props} file />,
    'async-select': AsyncSelect,
    date: (props) => <Input date={true} {...props} />,
    // 'phone-number': PhoneNumberField,
    // 'users': UsersField,
    'object': ObjectField,
    // 'partner': PartnerField
};
