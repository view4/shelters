import Card from "modules/Core/components/ui-kit/Card";
import Container from "modules/Core/components/ui-kit/Container";
import Screen from "modules/Core/components/ui-kit/Screen"
import Title from "modules/Core/components/ui-kit/Title";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected"
import TrackedTimeFeed from "modules/timetracker/submodules/trackedTime/components/TrackedTimeFeed";

const TrackedTimeScreen = ({ name, dedicatedTimeId }) => {
    return (
        <Screen
            title={"View Tracked Time"}
            contentHeader={
                <Card>
                    <Title>{name}</Title>
                </Card>
            }
            back={{ to: "/", text: "Back" }}
            tabs={[
                {
                    title: 'Tracked Time',
                    Component: () => (
                        <Container>
                            <TrackedTimeFeed dedicatedTimeId={dedicatedTimeId} />
                        </Container>
                    )
                }
            ]}
        />
    )
};

export default strappedConnected(
    TrackedTimeScreen,
    {},
    {},
    ({ dedicatedTimeId }) => {
        return ({})
    }
);