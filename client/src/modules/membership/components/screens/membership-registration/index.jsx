import c from "classnames"
import { useMemo, useState } from "react"
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
import styles from "./styles.module.scss"
import Title from "modules/Core/sub-modules/ui-kit/components/Title"

const PaymentsSection = withPaymentsWrapper(({ clientSecret, options }) => (
    <Container className={c(styles.paymentsContainer, { [styles.open]: Boolean(clientSecret) })}>
        <Title> Subscribe as a member</Title>
        <PaymentCard className={styles.paymentsCard} options={options} clientSecret={clientSecret} />
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
    const paymentOptions = useMemo(() => ({
        onSuccess: () => close()
    }), [close]);

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
            <Drawer className={styles.drawer} origin="right" isOpen={isOpen} close={close}>
                <PaymentsSection clientSecret={clientSecret} options={paymentOptions} />
            </Drawer>
        </Screen>
    )
}

export default MembershipRegistration;