import withFocusedBoothId from "modules/booths/higher-order-components/withFocusedBoothId";
import Container from "modules/Core/components/ui-kit/Container";
import styles from "./styles.module.scss";
import Timemap from "modules/timemapper/components/Timemap";
import ScheduleTimeButton from "modules/timemapper/components/MapTimeButton";


const BoothScheduleTab = ({ boothId, }) => {
    const [view, setView] = useState('week');
    return (
        <Container className={styles.container} flex col>
            <Container flex justifyEnd p1>
                <Container m1 >
                    <Button
                        className={styles.button}
                        onClick={() => setView('month')}
                    >
                        Month
                    </Button>
                    <Button
                        className={styles.button}
                        onClick={() => setView('week')}
                    >
                        Week
                    </Button>
                    <Button
                        className={styles.button}
                        onClick={() => setView('day')}
                    >
                        Day
                    </Button>
                </Container>
                <ScheduleTimeButton
                    boothId={boothId}
                    text="+"
                />
            </Container>
            <Timemap boothId={boothId} view={view} />
        </Container>
    )
};

export default withFocusedBoothId(BoothScheduleTab);