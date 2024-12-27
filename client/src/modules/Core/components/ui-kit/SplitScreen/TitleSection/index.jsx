import cx from 'classnames';
import Container from 'modules/Core/components/ui-kit/Container';
import Title from 'modules/Core/components/ui-kit/Title';
import styles from './styles.module.scss';
import DirectionalActions from '../../DirectionalActions';


const TitleSection = ({ title, width, className, children, actions }) => {
    return (
        <Container
            className={cx(styles.container, className)}
            style={{ width }}
            flex alignCenter spaceBetween
        >
            <Title flex alignCenter>
                <DirectionalActions 
                    actions={actions} 
                    shouldRender={Boolean(actions)} 
                />
                {title}
            </Title>
            {children}
        </Container>
    )
}

export default TitleSection;