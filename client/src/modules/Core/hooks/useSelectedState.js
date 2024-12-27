import { useCallback, useState } from "react";

export default () => {
    const [selected, setSelected] = useState({});

    const onSelectFeedItem = useCallback((item) => {
        const { [item.id]: _, ...rest } = selected;
        if (Boolean(_)) return setSelected(rest);
        return setSelected({
            ...rest,
            [item.id]: item,
        })
    });

    return {
        onSelectFeedItem,
        selected
    }
};