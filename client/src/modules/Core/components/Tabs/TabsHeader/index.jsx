import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import styles from "./styles.module.scss";

const TabsHeader = ({ tabs, activeIndex, setActiveIndex }) => (
    <Container flex alignCenter>
        {tabs.map(({ title }, i) => (
            <Container
                onClick={() => setActiveIndex(i)}
                className={activeIndex === i ? styles.activeTab : styles.tab}
            >
                <Button>
                    {title}
                </Button>
            </Container>
        ))}
    </Container>
);

export default TabsHeader;