import cx from "classnames";
import { Settings } from "modules/Core/sub-modules/ui-kit/components/indicators";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import styles from "./styles.module.scss";

const TranslationActions = ({ onTranslate, onSettings, language, className }) => (
    <Container className={cx(styles.container, className)} >
        <Button nature={'grey'} onClick={onTranslate} >
            Translate {language && `(${language})`}
        </Button>
        <Button onClick={onSettings} nature={'grey'}>
            <Settings />
        </Button>
    </Container>
);

export default TranslationActions;