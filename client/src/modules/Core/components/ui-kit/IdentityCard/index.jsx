import cx from 'classnames';
import Container from 'modules/Core/components/ui-kit/Container';
import Title from 'modules/Core/components/ui-kit/Title';
import { Profile } from 'modules/Core/components/ui-kit/indicators';
import withShouldRender from 'modules/Core/higher-order-components/withShouldRender';
import styles from "./styles.module.scss";

const ProfileIcon = withShouldRender(({ DefaultImage, ...props }) => <Container className={styles.profileIconContainer}><DefaultImage  {...props} /></Container>);

const IdentityCard = ({ image, name, className, children, size = 'md', displayProfile = true, TitleElement, DefaultImage = Profile, ...props }) => (
    <Container className={cx(className, styles.container, { [styles[size]]: Boolean(size) })} {...props}>
        <Container center flex>
            {Boolean(image) ? <img src={image} className={styles.image} /> : <ProfileIcon DefaultImage={DefaultImage} shouldRender={displayProfile} className={styles.profileIcon} />}
        </Container>
        <Container>
            <Title Element={TitleElement}>{name}</Title>
            {children}
        </Container>
    </Container>
)

export default IdentityCard;