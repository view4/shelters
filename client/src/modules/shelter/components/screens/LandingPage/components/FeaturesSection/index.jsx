import c from "classnames";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";
import styles from "./styles.module.scss";

const ENHANCED_FEATURES = [
    {
        name: "Intentional Time Tracking",
        description: "Track not just what you do, but how present you are while doing it. Capture the quality of your attention and the depth of your engagement.",
        details: "Includes mindfulness prompts, presence scoring, and reflection notes.",
        icon: (
            <svg className={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        gradient: "from-spiritual-blue-to-spiritual-purple"
    },
    {
        name: "Values Alignment",
        description: "Discover how your daily activities align with your deepest values. Get insights that help you live more authentically.",
        details: "Personal values assessment, alignment scoring, and gentle course corrections.",
        icon: (
            <svg className={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        gradient: "from-spiritual-crimson-to-spiritual-purple"
    },
    {
        name: "Sacred Patterns",
        description: "Uncover the rhythms and patterns that support your growth. See your life as a beautiful, evolving tapestry of meaning.",
        details: "Pattern recognition, energy flow mapping, and wisdom extraction from your data.",
        icon: (
            <svg className={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        gradient: "from-spiritual-crimson-to-spiritual-blue"
    },
    {
        name: "Gentle Guidance",
        description: "Receive compassionate insights and gentle nudges toward more mindful living. No judgment, only loving support for your journey.",
        details: "Personalized reflections, mindful prompts, and supportive community features.",
        icon: (
            <svg className={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        gradient: "from-spiritual-crimson-to-spiritual-blue"
    },
    {
        name: "Wisdom Journal",
        description: "Capture insights, reflections, and moments of clarity. Build a personal archive of wisdom gathered from your lived experience.",
        details: "Voice notes, text reflections, photo moments, and wisdom distillation tools.",
        icon: (
            <svg className={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        gradient: "from-spiritual-blue-to-spiritual-purple"
    },
    {
        name: "Sacred Rituals",
        description: "Create and nurture meaningful daily practices that anchor you in presence and intention throughout your journey.",
        details: "Ritual builder, mindful transitions, ceremony tracking, and spiritual milestone celebrations.",
        icon: (
            <svg className={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1.5-5 6-5 4.5 0 6 3 6 5 2-1 2.5-3.5 2.5-3.5a8 8 0 01-5.843 11.157z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v3" />
            </svg>
        ),
        gradient: "from-spiritual-crimson-to-spiritual-purple"
    }
];

const FeatureCard = ({ name, description, details, icon, gradient, className }) => (
    <Container className={c(styles.featureCard, className)}>
        <Container className={c(styles.iconContainer, styles[gradient])}>
            {icon}
        </Container>
        <Title Element="h4" className={styles.cardTitle}>
            {name}
        </Title>
        <Text className={styles.cardDescription}>
            {description}
        </Text>
        <Container className={styles.cardDetails}>
            <Text className={styles.detailsText}>
                {details}
            </Text>
        </Container>
    </Container>
);

const FeaturesSection = () => {
    return (
        <Container id="features" className={c(styles.section, styles.featuresSection)}>
            <Container className={styles.contentWrapper}>
                {/* Header Section */}
                <Container className={styles.headerSection}>
                    <Title Element="h3" className={styles.sectionTitle}>
                        Sacred Tools for Mindful Living
                    </Title>
                    <Container className={styles.decorativeDivider} />
                </Container>

                {/* Features Grid */}
                <Container className={styles.featuresGrid}>
                    {ENHANCED_FEATURES.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </Container>
            </Container>
        </Container>
    );
};

export default FeaturesSection;