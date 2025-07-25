import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import strapped from "modules/Core/higher-order-components/strapped";
import { useNavigate } from "react-router-dom";

export default strapped(
    Button, 
    ({id}) => {
        const navigate = useNavigate();
        return {
            text: "View",
            onClick: () => navigate(`/view-roadmap/${id}`)
        }
    }
)