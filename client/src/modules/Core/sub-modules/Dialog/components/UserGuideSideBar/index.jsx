import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useMemo } from "react"
import { useIsOpen } from "modules/Core/hooks/useIsOpen"
import Sidebar from "modules/Core/components/Sidebar";
import userGuide from "../../state/cells/displayUserGuide";
import _Title from "modules/Core/components/ui-kit/Title";
import _Text from "modules/Core/components/ui-kit/Text";
import Container from "modules/Core/components/ui-kit/Container";
import { get } from "modules/Core/utils/obj";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import GUIDE from './lib'
import styles from "./styles.module.scss";

const Title = withShouldRender(_Title)
const Text = withShouldRender(_Text);

const UserGuideSideBar = () => {
    const dispatch = useDispatch();
    const { isOpen, close, open } = useIsOpen();
    const { key } = useSelector(userGuide.select) ?? {};

    const { title, subheader, text } = useMemo(() => key ? (get(GUIDE, key) ?? {}) : {}, [key]);

    useEffect(() => {
        key ? open() : close();
    }, [key]);

    const handleClose = useCallback(() => {
        dispatch(userGuide.action())
    });

    return (
        <Sidebar
            isOpen={isOpen}
            close={handleClose}
            origin='right'
            backdrop={false}
            header={'User Guide'}
            headerChildren={null}
        >
            <Container className={styles.container} flex col flexStart p1>
                <Title shouldRender={Boolean(title)}>{title}</Title>
                <Title shouldRender={Boolean(subheader)} Element='h4'>{subheader}</Title>
                <Text shouldRender={Boolean(text)}>{text}</Text>
            </Container>
        </Sidebar>
    )
}

export default UserGuideSideBar;