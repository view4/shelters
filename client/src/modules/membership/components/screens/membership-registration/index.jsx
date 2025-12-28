import c from "classnames"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "modules/Core/sub-modules/ui-kit/components/Card"
import Screen from "modules/Core/sub-modules/ui-kit/components/Screen"
import Text from "modules/Core/sub-modules/ui-kit/components/Text"
import PaymentCard from "modules/payments/components/PaymentCard"
import middleware from "modules/membership/middleware"
import Button from "modules/Core/sub-modules/ui-kit/components/Button"
import withPaymentsWrapper from "modules/payments/hocs/withPaymentsWrapper"
import Container from "modules/Core/sub-modules/ui-kit/components/Container"
import Drawer from "modules/Core/sub-modules/ui-kit/components/Drawer"
import { useIsOpen } from "modules/Core/hooks/useIsOpen"
import Title from "modules/Core/sub-modules/ui-kit/components/Title"
import styles from "./styles.module.scss"

const PaymentsSection = withPaymentsWrapper(({ clientSecret, options }) => (
    <Container className={c(styles.paymentsContainer, { [styles.open]: Boolean(clientSecret) })}>
        <Title> Subscribe as a member</Title>
        <PaymentCard className={styles.paymentsCard} options={options} clientSecret={clientSecret} />
    </Container>
))

const MembershipRegistration = () => {
    const [clientSecret, setClientSecret] = useState(null);
    const { isOpen, open, close } = useIsOpen();
    const navigate = useNavigate();

    const fetchClientSecret = async () => {
        const res = await middleware.ops.create();
        if (!res?.initMembership?.clientSecret) throw new Error("Failed to prepare payment");
        if (res.error) throw new Error(res.error);
        setClientSecret(res.initMembership.clientSecret);
        open();
    };


    const paymentOptions = useMemo(() => ({
        onSuccess: () => {
            close();
            navigate('/subscribe/success');
        }
    }), [close, navigate]);

    return (
        <Screen flex className={styles.container}>
            {/* Back Arrow */}
            <button className={styles.backButton} onClick={() => navigate(-1)} aria-label="Go back">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span>Back</span>
            </button>

            {/* Two Column Grid */}
            <div className={styles.gridContainer}>
                {/* Left Column - Main Content */}
                <div className={styles.leftColumn}>
                    <Card className={styles.card}>
                        <div className={styles.subscribeContent}>
                            <Title>Become a member</Title>
                            <Text className={styles.mainText}>
                                Booths membership gives you access to unlimited booths, and more, to help you continue your growth and development.
                            </Text>
                            
                            <div className={styles.benefitsSection}>
                                <div className={styles.benefitItem}>
                                    <span className={styles.benefitIcon}>🌱</span>
                                    <div>
                                        <Text bold className={styles.benefitTitle}>Nurture Your Growth</Text>
                                    </div>
                                </div>
                                
                                <div className={styles.benefitItem}>
                                    <span className={styles.benefitIcon}>🎯</span>
                                    <div>
                                        <Text bold className={styles.benefitTitle}>Stay Committed</Text>
                                    </div>
                                </div>
                                
                                <div className={styles.benefitItem}>
                                    <span className={styles.benefitIcon}>✨</span>
                                    <div>
                                        <Text bold className={styles.benefitTitle}>Embrace the Journey</Text>
                                    </div>
                                </div>
                            </div>

                            <Text className={styles.footerText}>
                                Start your journey today. Cancel anytime—no questions asked.
                            </Text>
                        </div>
                        <Button onClick={fetchClientSecret}>
                            Continue
                        </Button>
                    </Card>
                </div>

                {/* Right Column - Purchase Summary */}
                <div className={styles.rightColumn}>
                    <Card className={styles.summaryCard}>
                        <Container maxWidth center flex col>
                            <Title>Purchase Summary</Title>
                        </Container>
                        <div className={styles.summaryContent}>
                            <div className={styles.summaryItem}>
                                <Text bold>Membership Plan</Text>
                                <Text>Monthly Subscription</Text>
                            </div>
                            <div className={styles.summaryDivider} />
                            <div className={styles.summaryItem}>
                                <Text bold>Billing Cycle</Text>
                                <Text>Monthly (renews automatically)</Text>
                            </div>
                            {/* <div className={styles.summaryDivider} /> */}
                            {/* <div className={styles.summaryItem}>
                                <Text bold>Benefits</Text>
                                <ul className={styles.benefitsList}>
                                    <li>Access to all premium booths</li>
                                    <li>Unlimited journey tracking</li>
                                    <li>Priority support</li>
                                    <li>Cancel anytime</li>
                                </ul>
                            </div> */}
                            <div className={styles.summaryDivider} />
                            <div className={styles.totalSection}>
                                <Text bold className={styles.totalLabel}>Total Amount</Text>
                                <Text bold className={styles.totalAmount}>£5 / month</Text>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <Drawer className={styles.drawer} origin="right" isOpen={isOpen} close={close}>
                <PaymentsSection clientSecret={clientSecret} options={paymentOptions} />
            </Drawer>
        </Screen>
    )
}

export default MembershipRegistration;