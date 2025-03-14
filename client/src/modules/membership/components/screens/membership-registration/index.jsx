import c from "classnames"
import { useState } from "react"
import Card from "modules/Core/components/ui-kit/Card"
import Screen from "modules/Core/components/ui-kit/Screen"
import Text from "modules/Core/components/ui-kit/Text"
import PaymentCard from "modules/payments/components/PaymentCard"
import middleware from "modules/membership/middleware"
import Button from "modules/Core/components/ui-kit/Button"
import withPaymentsWrapper from "modules/payments/hocs/withPaymentsWrapper"
import Container from "modules/Core/components/ui-kit/Container"
import Drawer from "modules/Core/components/ui-kit/Drawer"
import { useIsOpen } from "modules/Core/hooks/useIsOpen"
import styles from "./styles.module.scss"

const PaymentsSection = withPaymentsWrapper(({ clientSecret }) => (
    <Container className={c({ [styles.open]: Boolean(clientSecret) })}>
        <PaymentCard clientSecret={clientSecret} />
    </Container>
))

const MembershipRegistration = () => {
    const [clientSecret, setClientSecret] = useState(null);
    const { isOpen, open, close } = useIsOpen();

    const fetchClientSecret = async () => {
        const res = await middleware.ops.create();
        if (!res?.initMembership?.clientSecret) throw new Error("Failed to prepare payment");
        if (res.error) throw new Error(res.error);
        setClientSecret(res.initMembership.clientSecret);
        open();
    }

    return (
        <Screen flex className={styles.container}>
            <Container>
                <Card header="Subscribe!" className={styles.card}>
                    <Text>
                        Subscribing today gives you access to
                        more booths to continue your
                        journey indefinitely.
                    </Text>
                    <Button onClick={fetchClientSecret}>
                        Subscribe
                    </Button>
                </Card>
            </Container>
            <Drawer origin="right" isOpen={isOpen} close={close}>
                <PaymentsSection clientSecret={clientSecret} />
            </Drawer>
        </Screen>
    )
}

export default MembershipRegistration;