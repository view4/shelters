import React from 'react';
import { UpArrow, DownArrow } from 'modules/Core/components/ui-kit/indicators';
import Container from 'modules/Core/components/ui-kit/Container';
import Button from 'modules/Core/components/ui-kit/Button';
import cx from 'classnames';
import styles from './styles.module.scss';
import { InputLabel } from 'modules/Core/components/ui-kit/Input';

const VoteButtons = ({ value, onChange, label, className }) => {
    const handleUpvote = () => onChange(1);
    const handleDownvote = () => onChange(-1);

    return (
        <Container className={cx(styles.container, className)}>
            {label && <InputLabel label={label} />}
            <Container className={styles.buttons}>
                <Button 
                    className={cx(styles.button, { [styles.selected]: value === 1 })}
                    onClick={handleUpvote}
                >
                    <UpArrow />
                </Button>
                <Button 
                    className={cx(styles.button, { [styles.selected]: value === -1 })}
                    onClick={handleDownvote}
                >
                    <DownArrow />
                </Button>
            </Container>
        </Container>
    );
};

export default VoteButtons; 