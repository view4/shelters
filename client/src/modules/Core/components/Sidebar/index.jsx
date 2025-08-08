import cx from "classnames";
import Drawer from "modules/Core/sub-modules/ui-kit/components/Drawer";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import styles from './styles.module.scss';
// import P4PEmblem from "modules/P4P/components/P4PEmblem";


const Sidebar = ({ isOpen, close, children, origin = 'left', className, authLinksProps, ...props }) => (
    <Drawer
        isOpen={isOpen}
        close={close}
        origin={origin}
        size={"md"}
        headerChildren={<>
            {/* <P4PEmblem nature='decoratedName' containerClassName={styles.logoContainer} className={styles.logo} /> */}
            `</>}
        className={cx(styles.drawer, className)}
        {...props}
    >
        <Container flex col span spaceBetween maxHeight>
            {children}
        </Container>
    </Drawer>
)

export default Sidebar;