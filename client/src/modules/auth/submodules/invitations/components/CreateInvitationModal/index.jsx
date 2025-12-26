import { useCallback } from "react"
import strappedConnected from "modules/Core/higher-order-components/strappedConnected"
import useOnSuccess from "modules/Core/sub-modules/Dialog/hooks/useOnSuccess"
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal"
import SchemaForm from "modules/Core/components/form/Form/SchemaForm"
import { individualInvitationFeed } from "modules/auth/submodules/invitations/state/feed"

const schema = {
    fields: {
        email: {
            type: "email",
            label: "Email",
            required: true,
        },
    }
}

const Component = ({ isOpen, close, onSubmit }) => {
    return (
        <Modal isOpen={isOpen} onClose={close}>
            <SchemaForm schema={schema} onSubmit={onSubmit} />
        </Modal>
    )
}


export default strappedConnected(Component, {}, {
    createInvitation: (input, callback) => individualInvitationFeed.cells.createEntity.action({ input, callback })
}, ({ createInvitation, close, onSubmit }) => {

    const onSuccess = useOnSuccess();

    const callback = useCallback((res) => {
        if (!res?.id) return null;
        onSuccess("Invitation created successfully");
        close();
    }, [onSuccess, close, onSubmit]);
    return {
        onSubmit: useCallback(({ email }) => createInvitation({ input: { email } }, callback), [createInvitation, callback])
    }
})