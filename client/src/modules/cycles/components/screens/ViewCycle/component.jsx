import BoothScreen from "modules/shelter/components/BoothScreen";
import BoothScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader";
import Cycle from "../../Cycle";
import FocusCycleButton from "../../FocusCycleButton";
import { CYCLES } from "modules/booths/components/InfoComponent/lib/keys";
import CompleteCycleButton from "../../CompleteCycleButton";
import styles from "./styles.module.scss"

const ViewCycle = ({ cycle, id }) => {
    return (
        <BoothScreen boothId={cycle?.boothId}>
            <BoothScreenHeader
                header={"Cycle"}
                infoKey={CYCLES.cycle}
                options={[
                    { Component: FocusCycleButton, props: { cycleId: id } },
                    { Component: CompleteCycleButton, props: { cycleId: id,  } },
                ]}
            />
            <Cycle id={id} />
        </BoothScreen>
    )
}

export default ViewCycle