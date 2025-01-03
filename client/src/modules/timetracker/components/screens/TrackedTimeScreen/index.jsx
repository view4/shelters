import Screen from "modules/Core/components/ui-kit/Screen"
import Title from "modules/Core/components/ui-kit/Title";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected"

const TrackedtimeScreen = ({ name }) => {
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
                    Component: () => <Container>
                        <Title>Tracked Time</Title>
                        <Feed.Component
                            feed={children}
                            ItemComponent={FeedItemComponent}
                        />
                    </Container>
                }
            ]}


        />
    )
};

export default strappedConnected(
    TrackedtimeScreen,
    {},
    {},
    ({ }) => {

        return ({

        })
    }
);