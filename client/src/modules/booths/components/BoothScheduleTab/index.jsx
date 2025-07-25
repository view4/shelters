import cx from "classnames";
import { useState } from "react";
import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Timemap from "modules/timemapper/components/Timemap";
import ScheduleTimeButton from "modules/timemapper/components/MapTimeButton";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import styles from "./styles.module.scss";


const BoothScheduleTab = ({ boothId, initialView = 'month', ...props }) => {
    const [view, setView] = useState(initialView);
    const [presetValues, setPresetValues] = useState({});


    return (
        <Container className={styles.container} {...props} flex center>
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
                            initialState={presetValues}
                        />
                    </Container>
                }
            } className={styles.card}>
                <Timemap
                    className={styles.timemap}
                    boothId={boothId}
                    view={view}
                    onSelectDates={(start, end) => setPresetValues({
                        startDate: start,
                        endDate: end,
                        startTime: start,
                        endTime: end,
                    })}
                />

            </Card>
        </Container>
    )
};

export default withFocusedBoothId(BoothScheduleTab);