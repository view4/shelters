import cx from 'classnames'
import withShouldRender from 'modules/Core/higher-order-components/withShouldRender';
import { CHEVRON_BY_NATURE } from 'modules/Core/styles/consts'

const Chevron = ({ nature, className, ...props }) => {
    return (
        <span
            className={cx(CHEVRON_BY_NATURE[nature], className)} 
            {...props}
        />
    )
};

export default withShouldRender(Chevron);