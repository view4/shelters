import cx from "classnames";
import { useState } from "react";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import Container from "modules/Core/components/ui-kit/Container";
import Timemap from "modules/timemapper/components/Timemap";
import ScheduleTimeButton from "modules/timemapper/components/MapTimeButton";
import Button from "modules/Core/components/ui-kit/Button";
import styles from "./styles.module.scss";
import Card from "modules/Core/components/ui-kit/Card";


const BoothScheduleTab = ({ boothId, }) => {
    const [view, setView] = useState('month');
    return (
        <Container className={styles.container} flex center>

            <Card HeaderComponent={Container} headerProps={
                {
                    children: <Container className={styles.buttonsContainer} flex spaceBetween alignCenter p1>
                        <Container m1 >
                            <Button
                                className={styles.button}
                                onClick={() => setView('month')}
                                active={view === 'month'}
                            >
                                Month
                            </Button>
                            <Button
                                className={styles.button}
                                onClick={() => setView('week')}
                                active={view === 'week'}
                            >
                                Week
                            </Button>
                            <Button
                                className={styles.button}
                                onClick={() => setView('day')}
                                active={view === 'day'}
                            >
                                Day
                            </Button>
                        </Container>
                        <ScheduleTimeButton
                            boothId={boothId}
                            text="+"
                        />
                    </Container>
                }
            } className={styles.card}>
                <Timemap className={styles.timemap} boothId={boothId} view={view} />

            </Card>
        </Container>
    )
};

export default withFocusedBoothId(BoothScheduleTab);