import ExpandableCard from "modules/Core/components/ui-kit/Card/ExpandableCard";
import Text from "modules/Core/components/ui-kit/Text";

export const DescriptiveExpandableCard = ({ description, children, ...props }) => (
    <ExpandableCard {...props}>
        <Text>{description}</Text>
        {children}
    </ExpandableCard>
)

export default DescriptiveExpandableCard;