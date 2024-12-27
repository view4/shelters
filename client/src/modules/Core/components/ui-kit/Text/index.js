import React from 'react'
import cx from "classnames"
// import TranslatableText from './TranslatableText'
// import LinkedText from './LinkedText'
import withUIKitClasses from 'modules/Core/higher-order-components/withUIKitClasses'
import styles from './styles.module.scss'

const Text = (props) => {
    // TEMP DISABLED BECAUSE API NOT ACTIVE.
    // if (props.translatable) return <TranslatableText {...props} />
    // if (props.linked) return <LinkedText {...props} />
    return <Text.Component {...props} />
}


Text.Component = ({ children, text, className, bold, pre = false, linked, ...props }) => (
    <p className={cx(styles.text, className,  { [styles.bold]: bold, [styles.break]: pre })} {...props}>
        {children || text}
    </p>
);

export default withUIKitClasses(Text)