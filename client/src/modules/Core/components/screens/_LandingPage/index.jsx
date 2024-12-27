import classes from "classnames";
import { useNavigate } from "react-router-dom";
import Container from "modules/Core/components/ui-kit/Container";
import TypewriterText from "modules/Core/components/ui-kit/Text/TypewriterText";
import Title from "modules/Core/components/ui-kit/Title";
import Text from "modules/Core/components/ui-kit/Text";
import TextBlock from "./TextBlock";
import microcopy from "./microcopy.json"
import styles from "./styles.module.scss";

const { values, statement, footer, typewriter } = microcopy;

const LandingPage = () => (
    <Container relative>
        <LandingSection />
        <ValuesSection />
        <StatementSection />
        <InvolvementSection />
        <Footer />
    </Container>
);

const Header = () => {
    const navigate = useNavigate();
    return (
        <Container className={styles.header} flex>
            <Container flex flexEnd span>
                <Text className={styles.link}  bold onClick={() => navigate("/login")}>
                    Login
                </Text>
            </Container>
        </Container>
    )
}

const LandingSection = () => (
    <Container className={styles.container}>
        <Header />
        <Container flex center className={styles.title}>
            <TypewriterText statements={typewriter} />
            <Text>4</Text>
            Progress.
        </Container>
    </Container>
)

const ValuesSection = () => (
    <Container className={classes(styles.container, styles.valuesContainer)}>
        <Container className={styles.valuesLeft}>
            {values.left.map((quote, i) => (
                <Container flex column key={i} >
                    <Title Element="h4">{quote.text}</Title>
                    {quote?.source}
                </Container>
            ))}
        </Container>
        <Container className={styles.valuesRight}>
            {values.right.map((quote, i) => (
                <Container flex column key={i} >
                    <Title Element="h4">{quote.text}</Title>
                    {quote?.source}
                </Container>
            ))}
        </Container>
    </Container>
);

const StatementSection = () => (
    <Container className={classes(styles.container, styles.statementContainer)}>
        <Title>Statement</Title>
        <Container fitContent flex column center >
            <Container>
            </Container>
            <TextBlock text={statement} />
        </Container>
    </Container>
);

const InvolvementSection = () => {
    const navigate = useNavigate();
    return (
        <Container className={classes(styles.container, styles.involvementContainer)}>
            <Title>Register</Title>
            <Container>
                <Text className={styles.link} bold onClick={() => navigate("/register")}>
                    Let's go!
                </Text>
            </Container>
        </Container>
    );
}

const Footer = () => (
    <Container className={styles.footer} flex>
        <Container flex spaceBetween span center>
            <Text bold>
                {footer}
            </Text>
            <Text></Text>
        </Container>
    </Container>
)
export default LandingPage;