import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import AdminScreen from "../../AdminScreen";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import IndividualInvitationsFeed from "modules/auth/submodules/invitations/components/IndividualInvitationsFeed";
import InvitationLinksFeed from "modules/auth/submodules/invitations/components/InvitationLinksFeed";
import SelfInvitationsFeed from "modules/auth/submodules/invitations/components/SelfInvitationsFeed";
import CreateInvitationButton from "modules/auth/submodules/invitations/components/CreateInvitationButton";
import CreateInvitationLinkButton from "modules/auth/submodules/invitations/components/CreateInvitationLinkButton";
import styles from "./styles.module.scss";

const IndividualsTab = () => (
    <Container className={styles.tabContainer}>
        <CreateInvitationButton />
        <IndividualInvitationsFeed />
    </Container>
);

const LinksTab = () => (
    <Container className={styles.tabContainer}>
        <CreateInvitationLinkButton />
        <InvitationLinksFeed />
    </Container>
);

const ApplicationsTab = () => (
    <Container className={styles.tabContainer}>
        <SelfInvitationsFeed />
    </Container>
);

const invitationsTabs = [
    {
        title: 'Individuals',
        Component: IndividualsTab
    },
    {
        title: 'Links',
        Component: LinksTab
    },
    {
        title: 'Applications',
        Component: ApplicationsTab
    }
];

export default () => {
    return (
        <AdminScreen>
            <Container maxHeight className={styles.container}>
                <Container className={styles.header}>
                    <Title text="Invitations" Element="h1" />
                </Container>
                <Card
                    className={styles.invitationsCard}
                    tabs={invitationsTabs}
                    lightShadow
                    borderless
                    maxWidth
                />
            </Container>
        </AdminScreen>
    );
};

