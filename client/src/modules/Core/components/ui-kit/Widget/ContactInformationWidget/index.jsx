import strapped from "modules/Core/higher-order-components/strapped"
import FeaturesWidget from "../FeaturesWidget"
import styles from "./styles.module.scss"


export default strapped(
    FeaturesWidget,
    ({ fullName, phoneNumber, email, size='lg' }) => ({
        title: 'Contact Information',
        features: [
            {
                name: 'Contact Name',
                content: fullName
            },
            {
                name: 'Phone',
                content: phoneNumber
            },
            {
                name: 'Email',
                content: email

            }
        ],
        size,
        row: true,
        className: styles.container,
        featureProps: {
            className: styles.feature
        }
    })
)