import Card from "..";
import Button from "../../Button";
import styles from "./styles.module.scss";

const AddCard = ({ onClick }) => (
    <Card className={styles.container} onClick={onClick} flex center >
        <Button />
    </Card>
)

export default AddCard;