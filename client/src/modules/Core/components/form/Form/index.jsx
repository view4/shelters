import React, { useCallback, useEffect, useMemo, useState } from "react";
import cx from "classnames";
import strapped from "modules/Core/higher-order-components/strapped";
import Container from "modules/Core/components/ui-kit/Container";
import Button from "../../ui-kit/Button";
// import SchemaForm from "./SchemaForm";
import Success from "./Success";
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import Header from "../../ui-kit/layout/Header";
import Footer from "../../ui-kit/layout/Footer";
import styles from "./styles.module.scss";

const Component = ({ className, children, header, fullScreen, headerProps }) => (
    <Container
        className={
            cx(
                styles.container,
                className,
                { [styles.fullScreen]: fullScreen }
            )}
    >
        <Header
            shouldRender={Boolean(header)}
            title={header}
            fixed
            {...headerProps}
        />
        {children}
    </Container>
)

const Form = strapped(
    Component,
    ({
        onSubmit,
        parseIsSuccess = ((result) => Boolean(result)),
        children: _children,
        success,
        footerProps,
        submitButtonText = "Submit",
        onSuccess,
        SubmitButton = Button,
        SuccessComponent = Success,
    }) => {
        const [isSuccessful, setIsSuccessful] = useState(false);

        const callback = useCallback((result) => {
            const isSuccessful = parseIsSuccess(result);

            setIsSuccessful(isSuccessful);
            if (isSuccessful && onSuccess) onSuccess(result);
        }, [parseIsSuccess, onSuccess]);

        const handleSubmit = useCallback(() =>{
             onSubmit(callback)
            }, [onSubmit, callback]);

        const children = useMemo(() => {
            if (isSuccessful && Boolean(SuccessComponent)) return (
                <SuccessComponent
                    text={success?.text ?? "form submitted successfully"}
                    redirect={success?.redirect ?? '/campaigns'}
                    redirectText={success?.redirectText ?? "View Campaigns"}
                />
            );
            return (
                <>
                    {_children}
                    <Footer
                        className={styles.footer}
                        flex
                        flexEnd
                        {...footerProps}
                    >
                        <Container>
                            {onSubmit && <SubmitButton onClick={handleSubmit}>{submitButtonText}</SubmitButton>}
                        </Container>
                    </Footer>
                </>
            )
        }, [handleSubmit, _children, success?.text, isSuccessful, footerProps, success?.redirect])

        return ({
            isSuccessful,
            children
        })
    }
);


export default withRecursiveRender({
    // schema: SchemaForm,
}, Form);