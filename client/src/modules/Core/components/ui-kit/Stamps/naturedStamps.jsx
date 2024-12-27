import { useMemo } from "react"
import Stamps from ".";
import { compact } from "lodash";

export default (natureMap = {}, readableKeyMap = {}) => ({ stamps, ...props }) => {
    const s = useMemo(() => compact(Object.entries(stamps ?? {})?.map(([key, value]) => value && ({
        ...value,
        text: readableKeyMap[key] ?? key,
        nature: natureMap[key],
        timestamp: value?.[0]?.time
    }))), [stamps, natureMap]);

    return <Stamps stamps={s} {...props} />
}