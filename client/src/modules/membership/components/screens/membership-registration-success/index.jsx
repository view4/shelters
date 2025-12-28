import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Card from "modules/Core/sub-modules/ui-kit/components/Card"
import Screen from "modules/Core/sub-modules/ui-kit/components/Screen"
import Text from "modules/Core/sub-modules/ui-kit/components/Text"
import Button from "modules/Core/sub-modules/ui-kit/components/Button"
import Container from "modules/Core/sub-modules/ui-kit/components/Container"
import Title from "modules/Core/sub-modules/ui-kit/components/Title"
import authCells from "modules/auth/state/index"
import { useDispatch } from "react-redux"
import styles from "./styles.module.scss"

const MembershipRegistrationSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCells.validateToken.action());
    }, []);

    return (
        <Screen flex className={styles.container}>
            <Container className={styles.contentWrapper}>
                <Card className={styles.successCard}>
                    <div className={styles.successContent}>
                        <div className={styles.iconWrapper}>
                            <span className={styles.successIcon}>🎉</span>
                        </div>
                        
                        <Title className={styles.successTitle}>Welcome to the community!</Title>
                        
                        <Text className={styles.mainText}>
                            You've successfully joined as a member. 
                            {/* This is a meaningful step in your journey of growth and self-discovery. */}
                        </Text>

                        <div className={styles.nextSteps}>
                            <Text bold className={styles.nextStepsTitle}>What happens next?</Text>
                            
                            <div className={styles.stepsList}>
                                <div className={styles.stepItem}>
                                    <span className={styles.stepIcon}>✓</span>
                                    <Text className={styles.stepText}>Your subscription is now active</Text>
                                </div>
                                
                                <div className={styles.stepItem}>
                                    <span className={styles.stepIcon}>✓</span>
                                    <Text className={styles.stepText}>All booths and features are now unlocked</Text>
                                </div>
                                
                                <div className={styles.stepItem}>
                                    {/* <span className={styles.stepIcon}>✓</span> */}
                                    {/* <Text className={styles.stepText}>You'll receive a confirmation email shortly</Text> */}
                                </div>
                            </div>
                        </div>

                        <Text className={styles.encouragementText}>
                            Remember, this journey is yours. Take your time, explore at your own pace, and embrace each moment along the way.
                        </Text>

                        <div className={styles.buttonGroup}>
                            <Button 
                                onClick={() => navigate('/')}
                                className={styles.homeButton}
                            >
                                Return Home
                            </Button>
                        </div>
                    </div>
                </Card>
            </Container>
        </Screen>
    )
}

export default MembershipRegistrationSuccess;
