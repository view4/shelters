import { get } from "lodash";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import { DrawerDialogue } from "modules/Core/sub-modules/ui-kit/exports";
import lib from "./lib/index.json";
import keys from "./lib/keys";
import styles from "./styles.module.scss";
import { useMemo } from "react";


const InfoIndicator = ({ onClick }) => <Container onClick={onClick} className={styles.iIndicator}></Container>

const useInfoLib = (key) => {
    const { title, subtitle, content } = useMemo(() => get(lib, key), [key]);
    if (!title || !content) window.alert('No title, subtitle, or content found for key: ' + key);

    console.log(title, subtitle, content);
    return { title, subtitle, content };
}



export const InfoComponent = ({ onClick }) => {
    const { isOpen, open, close } = useIsOpen()
    const { title, subtitle, content } = useInfoLib(keys.ENTRIES.index);
    return (
        <>
            <InfoIndicator onClick={open} />
            <DrawerDialogue
                isOpen={isOpen ?? true}
                onClose={close}
                title={title}
                subtitle={subtitle}
                children={content}
            />
        </>
    )
}