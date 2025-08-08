import { useMemo } from 'react';
import { compact } from 'lodash';
import cx from 'classnames';
import Container from 'modules/Core/sub-modules/ui-kit/components/Container';
import withShouldRender from 'modules/Core/higher-order-components/withShouldRender';
import { CHEVRON_BY_NATURE } from 'modules/Core/styles/consts';
import styles from './styles.module.scss';

const DirectionalActions = ({ actions = {} }) => {
    const chevrons = useMemo(() => compact(
        Object.keys(actions).map(
            direction => (
                Boolean(actions[direction]) && <span
                    key={direction}
                    className={cx(CHEVRON_BY_NATURE[direction], styles.chevron, styles[direction])}
                    onClick={actions[direction]}
                />
            )
        )
    ));
    return (
        <Container>
            {chevrons}
        </Container>
    )
}

export default withShouldRender(DirectionalActions);