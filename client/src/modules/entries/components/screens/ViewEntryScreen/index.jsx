import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import component from "./component";
import feed from "modules/entries/state/feed";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import { useCallback, useState } from "react";
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess";
import useOnError from "modules/Core/sub-modules/Dialog/hooks/useOnError";

export default strappedConnected(
    component,
    {
        entry: (state, { id }) => feed.cells.fetchEntity.selector(id)(state),
    },
    {
        fetchEntity: feed.cells.fetchEntity.action,
        onSave: feed.cells.createEntity.action,
    },
    ({ id, fetchEntity, entry, onSave }) => {
        const { isOpen: isEditMode, open: openEditMode, close: closeEditMode } = useIsOpen();
        const [draftText, setDraftText] = useState(entry?.text);
    
        const handleCardDoubleClick = useCallback(() => {
            setDraftText(entry?.text);
            openEditMode();
        }, [entry?.text, openEditMode]);
    
        const success = useOnSuccess();
        const error = useOnError();

        useOnLoad(() => {
            fetchEntity({ id });
        }, id, [id]);

        const callback = useCallback((res) => {
            if (!Boolean(res?.upsertEntry?.id)) return error('Creating Entity Failed')
            success("entry created");
            closeEditMode();
            fetchEntity({ id });
        }, [onSave, fetchEntity, id, closeEditMode]);

        return {
            name: entry?.name,
            text: entry?.text,
            boothId: entry?.boothId,
            createdAt: entry?.createdAt,
            onSave: useCallback(() => onSave({ id, input: {name: entry?.name, text: draftText}, callback }), [onSave, entry?.name, id, callback, draftText]),
            isEditMode,
            openEditMode,
            closeEditMode,
            draftText,
            setDraftText,
            handleCardDoubleClick,
        }
    }
)