import cx from 'classnames'
import ConditionalContainer from 'modules/Core/sub-modules/ui-kit/components/ConditionalContainer';
import NextButton from 'modules/Core/sub-modules/ui-kit/components/Button/NextButton';
import Text from 'modules/Core/sub-modules/ui-kit/components/Text';
import Screen from 'modules/Core/sub-modules/ui-kit/components/Screen';
import Card from 'modules/Core/sub-modules/ui-kit/components/Card';
import Container from '../../Container';
import NodeNetwork from 'modules/Core/components/screens/LandingPage/NodeNetwork';
import { BackNavigation } from '../ScreenSidePanel/ScreenNavigation';
import styles from './styles.module.scss';

const defaultBack = {
    navigate: -1,
    text: 'Back'
};

const CenteredCardScreen = ({
    cardHeader,
    header,
    subHeader,
    nextText,
    onNext,
    children,
    background,
    cardClassName,
    back,
    cardHeaderProps,
    ...props
}) => (
    <Screen header={header} {...props}>
        <Container span flex center absolute>
            <BackNavigation className={styles.back} back={back == true ? defaultBack : back} />
            <Card 
                className={cx(styles.card, cardClassName)} 
                header={cardHeader}
                headerProps={cardHeaderProps}
            >
                <Container>
                    <Text className={styles.label}>{subHeader}</Text>
                </Container>
                {children}
                <ConditionalContainer shouldRender={Boolean(onNext)} flex alignCenter flexEnd>
                    <NextButton onClick={onNext} text={nextText} />
                </ConditionalContainer>
            </Card>
        </Container>
        {background && <NodeNetwork background />}
    </Screen>
)
export default CenteredCardScreen