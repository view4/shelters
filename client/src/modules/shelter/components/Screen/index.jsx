import cx from "classnames"
import Button from "modules/Core/components/ui-kit/Button"
import Container from "modules/Core/components/ui-kit/Container"
import Screen from "modules/Core/components/ui-kit/Screen"
import strappedConnected from "modules/Core/higher-order-components/strappedConnected"
import cells from "modules/auth/state"
import styles from "./styles.module.scss"
import ExpandableOptions from "modules/Core/components/ui-kit/ExpandableOptions"


const _Screen = ({ isAuthed, headerChildren, email, className, ...props }) => {
    return (
        <Screen
            {...props}
            className={cx(styles.container, className)}
            headerChildren={
                <Container className={styles.headerChildren}>
                    {!isAuthed ? (<>
                        <Button to="/register">
                            Register Now
                        </Button>
                        <Button to="/login">
                            Login
                        </Button>
                    </>) : (
                        <ExpandableOptions
                            horizontal
                            className={styles.options}
                            label={email}
                            options={[
                                { props: { text: "logout", to: "/logout" } },
                                { props: { text: "settings", to: "/membership/settings" } },
                            ]}
                        />)}
                                            {headerChildren}

                </Container>
            }
        />
    )
}

export default strappedConnected(
    _Screen,
    {
        isAuthed: cells.validateToken.selectors.isAuthed,
        email: cells.validateToken.selectors.email,
    },
    {},
    ({ isAuthed }) => ({})
)