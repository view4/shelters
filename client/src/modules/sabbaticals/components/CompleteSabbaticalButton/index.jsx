import Button from "modules/Core/components/ui-kit/Button";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import withShouldRender from "modules/Core/higher-order-components/withShouldRender";
import cells from "modules/sabbaticals/state";

export default strappedConnected(
    withShouldRender(Button),
    {},
    { completeSabbatical: cells.completeSabbatical.action },
    ({ completeSabbatical }) => ({
        onClick: () => completeSabbatical({ startNewCycle: true }),
        text: "Complete Sabbatical",
    })

)