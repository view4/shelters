import { useMemo } from "react";
import { compact } from "lodash";
import cx from 'classnames';
import Container from "modules/Core/components/ui-kit/Container";
import strapped from "modules/Core/higher-order-components/strapped";
import Feature from "../Feature";
import Title from '../Title';
import styles from './styles.module.scss';

const renderFeature = (feature, index, { card, contentRequired, ...featureProps }) => {
    if (Boolean(contentRequired) && (!feature.content && !feature.renderContent) && !feature.jsx) return null;
    return <Feature key={index} card={card} {...feature} {...featureProps} />
}

const Features = ({ features, card, title, row, className, grid, featureProps, contentRequired = true, ...props }) => (
    <Container
        {...props}
        maxWidth
        className={
            cx({
                [styles.row]: Boolean(row),
                [styles.grid]: Boolean(grid),
                [className]: Boolean(className)
            })
        }
    >
        {title && <Title className={styles.title}>{title}</Title>}
        {features?.map((feature, i) => renderFeature(feature, i, { contentRequired, card, ...featureProps, }))}
    </Container>
)

export default strapped(
    Features,
    ({ features }) => ({
        features: useMemo(() => compact(features), [features])
    })
);