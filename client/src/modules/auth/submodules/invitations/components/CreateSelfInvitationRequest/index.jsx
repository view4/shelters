import { useCallback, useMemo } from "react"
import strappedConnected from "modules/Core/higher-order-components/strappedConnected"
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess"
import SchemaForm from "modules/Core/components/form/Form/SchemaForm"
import { selfInvitationFeed } from "modules/auth/submodules/invitations/state/feed"

const schema = {
    fields: {
        email: {
            type: "text",
            label: "Email",
            required: true,
        },
        name: {
            type: "text",
            label: "Name (optional)",
        },
        text: {
            type: "textarea",
            label: "Why do you want to join?",
            required: true,
        },
    }
}


export default strappedConnected(SchemaForm, {}, {
    onCreate: (input, callback) => selfInvitationFeed.cells.createEntity.action({ input, callback })
}, ({ onCreate, close, onSubmit, initialState, email, onSuccess: onSuccessProp }) => {

    const onSuccessToast = useOnSuccess();

    const callback = useCallback((res) => {
        if (!res) return null;
        onSuccessToast("Invitation request submitted successfully");
        onSuccessProp?.(res);
        close?.();
    }, [onSuccessToast, close, onSuccessProp]);

    return {
        schema,
        onSubmit: useCallback(({ email, name, text }) => onCreate({ input: { email, name, text } }, callback), [onCreate, callback]),
        initialState: useMemo(() => ({
            email: email || "",
        }), [email,]),
    }
})