import Widget from 'modules/Core/sub-modules/ui-kit/components/Widget';
import Features from 'modules/Core/sub-modules/ui-kit/components/Features';
import styles from './styles.module.scss';

const FeaturesWidget = ({ label, features, row, size = 'md', featureProps, ...props }) => (
    <Widget label={label} defaultOpen={false} size={size} {...props}>
        <Features
            className={styles.features}
            features={features}
            featureProps={{
                TitleElement: 'h4',
                ...featureProps
            }}
            row={row}
        />
    </Widget>
)

export default FeaturesWidget;