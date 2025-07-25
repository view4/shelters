import { useMemo } from "react";
import Text from "../Text";
import { toNumber } from "lodash";

const formatDate = (date) => new Date(toNumber(date)).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

export const formatDateTime = (date) => new Date(toNumber(date)).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

const _Date = ({ date, formatter = formatDate, ...props }) => {
    const text = useMemo(() => formatter(toNumber(date)), [date]);
    return date && (
        <Text text={text} {...props} />
    )
};

export default _Date;