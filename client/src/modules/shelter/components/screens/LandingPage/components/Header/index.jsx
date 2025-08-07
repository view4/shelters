import c from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Link from "modules/Core/sub-modules/ui-kit/components/Link";
import styles from "./styles.module.scss";


const Header = ({ isAuthed }) => {
    return (
        <Container className={styles.navbar}>
            <Container className={styles.navContainer}>
                <Container className={styles.navContent}>
                    {/* Logo */}
                    <Container className={styles.logoSection}>
                        <Container className={styles.logoIcon}>
                        <svg width="60" height="60" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                {/* Main shelter structure */}
                                <path d="M12 22 L12 16 L20 12 L28 16 L28 22 L20 26 Z" stroke="white" stroke-width="2" fill="none" />
                                
                                {/* Central sacred space */}
                                <rect x="18" y="18" width="6" height="4" stroke="white" stroke-width="1" fill="none" />
                                
                                {/* Meditation cushions/stones */}
                                {/* <circle cx="15" cy="20" r="1.5" stroke="white" stroke-width="1" fill="none" opacity="0.7" />
                                <circle cx="25" cy="20" r="1.5" stroke="white" stroke-width="1" fill="none" opacity="0.7" /> */}
                                
                                {/* Sacred flame/light at the peak */}
                                <path d="M20 10 L19 8 Q20 7 21 8 L20 10" stroke="white" stroke-width="1" fill="white" opacity="0.8" />
                                
                                {/* Foundation line */}
                                <line x1="20" y1="14" x2="20" y2="30" stroke="white" stroke-width="1" opacity="0.6" />
                            </svg>
                        </Container>
                        <Text className={styles.logoText}>Shelters</Text>
                    </Container>

                    {/* Navigation Links */}
                    <Container className={styles.navLinks}>
                        <Link href="#home" className={styles.navLink}>
                            Home
                        </Link>
                        <Link href="#features" className={styles.navLink}>
                            Features
                        </Link>
                        <Link href="#essentials" className={styles.navLink}>
                            Essentials
                        </Link>
                        <Link href="#narrative" className={styles.navLink}>
                            Story
                        </Link>
                        <Link href="#connect" className={styles.navLink}>
                            Connect
                        </Link>

                        {/* Authentication-based buttons */}
                        {!isAuthed ? (
                            <Container className={styles.authButtons}>
                                <Button to="/register" className={styles.authButton}>
                                    Register
                                </Button>
                                <Button to="/login" className={styles.authButton}>
                                    Login
                                </Button>
                            </Container>
                        ) : (
                            <Button to="/booths" className={styles.boothsButton}>
                                <Text>Booths</Text>
                                <svg
                                    className={styles.arrowIcon}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </Button>
                        )}
                    </Container>

                    {/* Mobile Menu Button */}
                    <Button className={styles.mobileMenuButton}>
                        <svg
                            className={styles.mobileMenuIcon}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </Button>
                </Container>
            </Container>
        </Container>
    );
};

export default Header;