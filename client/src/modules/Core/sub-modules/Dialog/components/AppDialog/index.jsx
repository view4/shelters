import { isString } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useMemo } from "react"
import Dialog from "modules/Core/components/ui-kit/Dialog"
import Link from "modules/Core/components/ui-kit/Link"
import dialog from "../../state/cells/dialog"
import { useIsOpen } from "modules/Core/hooks/useIsOpen"
import { onCloseDialog } from "../../state/cells"

const AppDialog = () => {
    const dispatch = useDispatch();
    const { isOpen, close, open } = useIsOpen();
    const { message: _message, type } = useSelector(dialog.select) ?? {};
    
    const { message, action } = useMemo(() => {
        if (isString(_message)) return { message: _message };
        const message = _message?.message;
        return {
            message: message && <>{message}  {_message?.link && <Link hover={false} {..._message?.link} />} </>,
        }

    }, [_message]);

    useEffect(() => {
        message ? open() : close();
    }, [message]);

    const handleClose = useCallback(() => {
        close();
        dispatch(onCloseDialog())
    });

    return (
        <Dialog
            isOpen={isOpen}
            close={handleClose}
            message={message}
            type={type}
            action={action}
        />
    )
}

export default AppDialog