import cx from "classnames";
import { Button, Container, Screen, Text, Title, Loader } from "modules/Core/sub-modules/ui-kit/exports";
import { useState } from "react";
import styles from "./styles.module.scss";

const url = "https://forms.gle/qsecnE5y9qnajyGv9";

const FeedbackScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleConfirm = () => {
    setIsLoading(true);
    // Simulate brief loading before opening external link
    setTimeout(() => {
      // Open feedback link in new tab (dummy link for now)
      window.open(url, "_blank", "noopener,noreferrer");
      setIsLoading(false);
    }, 500);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <Screen className={styles.feedbackScreen}>
      <Container className={styles.container}>
        <Container className={styles.iconContainer}>
          {isLoading ? (
            <Loader className={styles.loader} />
          ) : (
            <Container className={styles.friendlyIcon}>
              💬
            </Container>
          )}
        </Container>
        
        <Container className={styles.content}>
          <Title className={styles.title}>
            External Feedback
          </Title>
          
          <Text className={styles.message}>
            This feedback form will direct you away from this website to an external platform. 
            Your responses will be collected there.
          </Text>
          
          <Text className={styles.subMessage}>
            Do you want to continue?
          </Text>
        </Container>
        
        <Container className={cx(styles.buttonContainer, { [styles.loading]: isLoading })}>
          <Button 
            className={styles.confirmButton}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Opening..." : "Confirm"}
          </Button>
          
          <Button 
            className={styles.backButton}
            onClick={handleGoBack}
            disabled={isLoading}
          >
            Go Back
          </Button>
        </Container>
      </Container>
    </Screen>
  );
};

export default FeedbackScreen;
