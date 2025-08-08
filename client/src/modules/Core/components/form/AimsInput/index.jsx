import { useCallback } from "react";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import { InputLabel } from "modules/Core/sub-modules/ui-kit/components/Input";
import AddCard from "modules/Core/sub-modules/ui-kit/components/Card/AddCard";
import EditableAimsCard from "./EditableAimsCard";
import InputCard from "./InputCard";

const AimsInput = ({ label, aims, setAims, inputProps }) => {
    const { isOpen, open, close } = useIsOpen();
    const onSubmitAim = ({ name, text }) => {
        setAims([...aims, { aim: name, description: text }])
        close();
    };

    const setAim = useCallback((aim, index) => {
        const _aims = [...aims];
        _aims[index] = aim;
        setAims([..._aims])
    }, [aims]);

    const deleteAim = useCallback((index) => {
        const _aims = [...aims];
        _aims.splice(index, 1);
        setAims([..._aims])
    }, [aims]);

    return (
        <Container column>
            {label && <InputLabel label={label} />}
            {aims.map(({ aim, description, isEdit }, i) => (
                <EditableAimsCard
                    aim={aim}
                    description={description}
                    setAim={(val) => setAim(val, i)}
                    onDelete={() => deleteAim(i)}
                    isEdit={isEdit}
                />
            )
            )}
            {isOpen ? <InputCard handleSubmit={onSubmitAim} {...inputProps} /> : <AddCard onClick={open} />}
        </Container>
    )
}
export default withShouldRender(AimsInput);