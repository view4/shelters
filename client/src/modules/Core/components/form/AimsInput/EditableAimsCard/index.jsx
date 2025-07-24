import InputCard from "../InputCard";
import DescriptiveExpandableCard from "modules/Core/sub-modules/ui-kit/components/Card/ExpandableCard/DescriptiveExpandableCard";
import AimsInputActions from "../AimsInputActions";
import styles from "./styles.module.scss";

const EditableAimsCard = ({ aim, description, setAim, isEdit, onDelete }) => {

    if (isEdit) return <InputCard handleSubmit={({ name, text }) => setAim({
        aim: name,
        description: text,
    })} entity={{
        name: aim,
        text: description
    }} />

    return (
        <DescriptiveExpandableCard
            label={aim}
            description={description}
            openClassName={styles.container}
        >
            <AimsInputActions onDelete={onDelete} onEdit={() => setAim({ aim, description, isEdit: true })} />
        </DescriptiveExpandableCard>
    )
}

export default EditableAimsCard;