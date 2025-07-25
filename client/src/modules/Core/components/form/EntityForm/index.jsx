import React, { useMemo, useState } from "react";
import cx from "classnames";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Input from "modules/Core/sub-modules/ui-kit/components/Input";
import AimsInput from "../AimsInput";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Header from "modules/Core/sub-modules/ui-kit/components/layout/Header";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import styles from "./styles.module.scss";

const EntityForm = ({
    handleSubmit: _handleSubmit,
    formContainerClassName,
    entity,
    title, header: _header,
    titleFieldProps,
    aimsFieldProps,
    textFieldProps,
    hasAims = false,
    className,
    children,
}) => {
    const [text, setText] = useState();
    const [name, setName] = useState();
    const [aims, setAims] = useState([]);

    useOnLoad(() => {
        const { text, name, aims } = entity;
        setName(name);
        setText(text);
        setAims(aims);
    }, Boolean(entity), [entity])

    const resetFields = () => {
        setText("");
        setName("");
        setAims([])
    }

    const handleSubmit = () => {
        const result = _handleSubmit({
            name,
            ...(hasAims && { aims }),
            text,
        })
        if (!result?.error) resetFields();
    }

    const header = useMemo(() => _header ?? <Header shouldRender={Boolean(title)} title={title} />, [title, _header])

    return (
        <Container className={cx(styles.container, className)}>
            {header}
            <Container className={formContainerClassName} col flex >
                <Container scrollY col flex maxWidth>
                    <Input
                        value={name}
                        onChange={setName}
                        {...titleFieldProps}
                    />
                    <AimsInput
                        shouldRender={hasAims}
                        aims={aims}
                        setAims={setAims}
                        {...aimsFieldProps}
                    />
                    <Input
                        value={text}
                        onChange={setText}
                        className={styles.textarea}
                        rows={12}
                        textarea
                        {...textFieldProps}
                    />
                    {children}

                </Container>
                <Container className={styles.submitContainer}>
                    <Button onClick={() => handleSubmit({ name, text })}>Submit</Button>
                </Container>
            </Container>
        </Container>
    )
};

export default EntityForm;