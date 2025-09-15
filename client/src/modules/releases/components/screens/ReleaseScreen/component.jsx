import cx from "classnames"
import { Button, Card, Container, Feature, Screen, Text, Title } from "modules/Core/sub-modules/ui-kit/exports"
import styles from "./styles.module.scss"

const ReleaseScreen = ({ title, releaseDate, features, links, narrative }) => {
    return (
        <Screen>
            <Container className={cx(styles.container)}>
                <Card className={cx(styles.section)}>
                    <Title>{title}</Title>
                    <Text>{releaseDate}</Text>
                </Card>
                <Card className={cx(styles.section)}>
                    {features.map((feature, index) => (
                        <Feature key={index} {...feature} />
                    ))}
                </Card>
                <Card className={cx(styles.section)}>
                    <Text>{narrative}</Text>
                </Card>
                <Card className={cx(styles.section)}>
                    {links.map((link, index) => (
                        <Button key={index} {...link} to={link.url} />
                    ))}
                </Card>
            </Container>
        </Screen>
    )
}

export default ReleaseScreen