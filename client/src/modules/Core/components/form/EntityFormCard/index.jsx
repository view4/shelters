import EntityForm from "../EntityForm";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import styles from "./styles.module.scss";

const EntityFormCard = ({ handleSubmit, ...props }) => (
    <Card relative className={styles.inputContainer}>
        <EntityForm
            handleSubmit={handleSubmit}
            formContainerClassName={styles.formContainer}
            {...props}
        />
    </Card>
)

export default withShouldRender(EntityFormCard);
