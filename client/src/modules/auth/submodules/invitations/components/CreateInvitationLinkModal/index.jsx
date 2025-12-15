import { useCallback, useMemo } from "react"
import strappedConnected from "modules/Core/higher-order-components/strappedConnected"
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess"
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal"
import SchemaForm from "modules/Core/components/form/Form/SchemaForm"
import { invitationsLinkFeed } from "modules/auth/submodules/invitations/state/feed"

const schema = {
    fields: {
        redemptionLimit: {
            type: "number",
            label: "Redemption Limit",
            required: true,
            number: true,
        },
        expirationDate: {
            type: "date",
            label: "Expiration Date",
            required: true,
        },
        description: {
            type: "text",
            label: "Description",
        },
    }
}

const Component = ({ isOpen, close, onSubmit, initialState }) => {
    return (
        <Modal isOpen={isOpen} onClose={close}>
            <SchemaForm schema={schema} onSubmit={onSubmit} initialState={initialState} />
        </Modal>
    )
};

export default strappedConnected(Component, {}, {
    createInvitationLink: (input, callback) => invitationsLinkFeed.cells.createEntity.action({ input, callback })
}, ({ createInvitationLink, close, onSubmit, initialState }) => {

    const onSuccess = useOnSuccess();

    const callback = useCallback((res) => {
        if (!res?.id) return null;
        onSuccess("Invitation link created successfully");
        close();
    }, [onSuccess, close, onSubmit, initialState]);
    return {
        onSubmit: useCallback(({ redemptionLimit, expirationDate, description }) => createInvitationLink({ input: { redemptionLimit, expirationDate, description } }, callback), [createInvitationLink, callback, initialState]),
        initialState: useMemo(() => ({
            redemptionLimit: initialState?.redemptionLimit || 1,
            expirationDate: initialState?.expirationDate || new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            description: initialState?.description || "",
        }), [initialState]),
    }
})