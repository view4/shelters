import cx from "classnames";
import Text from "../index";
import Container from "../../Container";
import useTranslation from "modules/Core/sub-modules/Translation/hooks/useTranslation";
import TranslationActions from "./TranslationActions";
import { OverlayLoader } from "../../Loader";
import styles from "./styles.module.scss";

const TranslatableText = ({
    children,
    text: _text,
    translatable,
    className,
    ...props
}) => {
    const {
        text,
        modal,
        openModal,
        language,
        translate,
        loading
    } = useTranslation(_text);
    return (
        <Container className={cx(styles.container, className)}>
            <OverlayLoader loading={loading} />
                <Text {...props}>
                    {text}
                </Text>
                <TranslationActions 
                    onTranslate={translate} 
                    onSettings={openModal} 
                    language={language}
                    className={styles.actions}
                />
            {modal}
        </Container>
    )
};

export default TranslatableText;