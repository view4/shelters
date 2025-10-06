import c from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import styles from "./styles.module.scss";
import { GENERAL_COPY } from "../../consts";

const ConnectionSection = ({ isAuthed }) => {
    // Commented out form state and handlers
    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: ''
    // });

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle form submission here
    //     console.log('Form submitted:', formData);
    // };

    return (
        <Container id="connect" className={c(styles.section, styles.connectionSection)}>
            <Container className={styles.contentWrapper}>
                {/* Callout Box */}
                <Container className={styles.calloutContainer}>
                    <Container className={styles.calloutBox}>
                        <Text className={styles.calloutText}>
                            {/* <Text Element="span" className={c(styles.highlightedWord, styles.sheltersHighlight)}>
                                Shelters
                            </Text> */}
                            {/* {GENERAL_COPY.NAME + " "} 

                            was born from the longing to bridge the gap between measurement and
                            meaning. */}
                            {/* <Text Element="span" className={c(styles.highlightedWord, styles.meaningHighlight)}>
                                meaning
                            </Text> */}
                        </Text>
                    </Container>
                </Container>

                {/* Authentication Buttons Card */}
                <Container className={styles.formCard}>
                    <Title className={styles.gradientTitle}>
                    {GENERAL_COPY.CONNECTION_TEXT}

                    </Title>

                    <Container className={styles.formContainer}>
                        {isAuthed ? (
                            /* If authenticated, show Booths button */
                            <Container className={styles.authButtonsContainer}>
                                <Button
                                    to="/booths"
                                    className={styles.boothsButton}
                                >
                                    <Text className={styles.buttonText}>
                                        Visit Your Booths
                                    </Text>
                                </Button>
                            </Container>
                        ) : (
                            /* If not authenticated, show Login and Register buttons */
                            <Container className={styles.authButtonsContainer}>
                                <Button
                                    to="/login"
                                    className={styles.loginButton}
                                >
                                    <Text className={styles.buttonText}>
                                        Login
                                    </Text>
                                </Button>
                                <Button
                                    to="/register"
                                    className={styles.registerButton}
                                >
                                    <Text className={styles.buttonText}>
                                        Register
                                    </Text>
                                </Button>
                            </Container>
                        )}
                        <Button
                            to="/releases/sukkot"
                            className={styles.releasesButton}
                            mt3
                        >
                            View Latest Release Notes
                        </Button>
                    </Container>
                </Container>

                {/* Commented out subscription form */}
                {/* <Container className={styles.formCard}>
                    <Container className={styles.formContainer}>
                        <form onSubmit={handleSubmit} className={styles.signupForm}>
                            <Container className={styles.inputsContainer}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                />
                            </Container>

                            <Button 
                                type="submit" 
                                className={styles.submitButton}
                            >
                                <Text className={styles.submitButtonText}>
                                    Reserve Your Sacred Space
                                </Text>
                            </Button>

                            <Text className={styles.privacyNote}>
                                We'll never share your information. Unsubscribe anytime.
                            </Text>
                        </form>
                    </Container>
                </Container> */}

                {/* Inspiring Quote */}
                {/* <Container className={styles.quoteSection}>
                    <Text className={styles.inspiringQuote}>
                        "Your time is sacred. Your attention is precious. Let Shelters be your gentle companion."
                    </Text>
                </Container> */}
            </Container>
        </Container>
    );
};

export default ConnectionSection;