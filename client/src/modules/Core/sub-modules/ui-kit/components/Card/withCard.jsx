
import cx from "classnames";
import { useMemo } from "react";
import Card from ".";

export default (Component, className) => ({ card, ...props }) => {
    return useMemo(() => {
        if (!card) return <Component {...props} />
        return (
            <Card className={cx(className, props.className)}>
                <Component {...props} />
            </Card>
        )
    }, [card, props])
}