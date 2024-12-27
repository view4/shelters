import { useMemo } from 'react';
import styles from "./styles.module.scss";
import Container from '../../ui-kit/Container';
import RedirectButton from '../../ui-kit/RedirectButton';
import Title from '../../ui-kit/Title';

const MenuItem = ({ text, header, to, divider }) => {
    const content = useMemo(() => {
        if (header) return <Title className={styles.title} p1 text={text} underline center />
        if (divider) return <Container maxWidth fullWidth bt1grey />
        return <RedirectButton to={to} text={text} />
    })
    return content;
}

export const SidebarItems = ({ links }) => (
    <Container className={styles.container} flex col alignCenter>
        {links.map((link, i) => (
            <MenuItem
                key={i}
                text={link?.text}
                header={link?.header}
                divider={link?.divider}
                to={link?.to}
            />
        ))}
    </Container>
)


export default SidebarItems