import BoothScreen from "modules/shelter/components/BoothScreen";
import BoothScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader";
import Cycle from "../../Cycle";
import FocusCycleButton from "../../FocusCycleButton";
import styles from "./styles.module.scss"

const ViewCycle = ({ cycle, id }) => {
    return (
        <BoothScreen boothId={cycle?.boothId}>
            <BoothScreenHeader
                header={"Cycle"}
                options={[
                    { Component: FocusCycleButton, props: { cycleId: id } },
                ]}
            />
            <Cycle id={id} />
        </BoothScreen>
    )
}

export default ViewCycle