import Container from "modules/Core/components/ui-kit/Container"
import { useCallback, useMemo } from "react";
import Text from "modules/Core/components/ui-kit/Text";
import SchemaForm from "../../SchemaForm";
import { InputLabel } from "modules/Core/components/ui-kit/Input";
import styles from "./styles.module.scss";
import ExpandableCard from "modules/Core/components/ui-kit/Card/ExpandableCard";

const defaultRenderValueItem = (val, index, options) => {
    if (options?.expandable) return (
        <ExpandableCard key={index} title={val?.name}>
            <Container>
                <Text>
                    {val[options?.textKey ?? 'text']}
                </Text>
            </Container>
        </ExpandableCard>
    )
    return (
        <Container key={index}>
            <Text>{val?.name}</Text>
        </Container>
    )
}

const SchemaFormArrayField = ({ fields, value = [], onChange, label, renderValueItem = defaultRenderValueItem, submitButtonText, expandable, textKey, ...props }) => {
    const onSubmit = useCallback((val) => {
        onChange([
            ...(value ?? []),
            val,
        ])
    }, [onChange, value]);

    const renderedValue = useMemo(() => value?.map((val, i) => renderValueItem(val, i, { expandable, textKey })), [renderValueItem, value, expandable, textKey]);

    return (
        <Container border p1 relative className={styles.container}>
            <InputLabel label={label} />
            {renderedValue}
            <SchemaForm
                schema={{ fields }}
                onSubmit={onSubmit}
                fullScreen={false}
                submitButtonText={submitButtonText}
                headerProps={{
                    relative: true,
                    fixed: false
                }}
                footerProps={{
                    relative: true,
                    fixed: false,
                    className: styles.footer
                }}
                className={styles.wrapper}
                cardless={true}
                options={{
                    highlightable: false
                }}
                {...props}
            />
        </Container>
    )
};

export default SchemaFormArrayField;
