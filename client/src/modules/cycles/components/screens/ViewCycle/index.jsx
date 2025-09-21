import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import component from "./component";

export default strappedConnected(
    component,
    {
    },
    {
        
    },
    ({ cycle, id, fetchEntity }) => {
        
        return {
            cycle,
            id,
        }
    }
)