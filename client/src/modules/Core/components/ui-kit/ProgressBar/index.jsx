import React, { useMemo } from 'react';
import { CircularProgress, LinearProgress } from '@mui/material';
import withRecursiveRender from 'modules/Core/higher-order-components/withRecursiveRender';
import Container from '../Container';
import styles from "./styles.module.scss";

const ProgressBar = ({ children, className, percentage, ...props }) => (
    <LinearProgress
        value={percentage}

    />
);

const CircularProgressBar = ({ percentage, size="4rem", ...props }) => (
    <Container flex center {...props}>
        <CircularProgress 
            value={percentage} 
            variant='determinate'
            size={size}
            className={styles.progress}
        />
        <CircularProgress 
            value={100} 
            variant='determinate'
            size={size}
            className={styles.total}
        />
    </Container>
)

const Component = withRecursiveRender({
    circle: CircularProgressBar
}, ProgressBar);

const withPercentage = (Component) => ({ min, max, ...props }) => {
    const percentage = useMemo(() => (min / max) * 100, [min, max]);
    return <Component percentage={percentage} {...props} />
}

export default withPercentage(Component)