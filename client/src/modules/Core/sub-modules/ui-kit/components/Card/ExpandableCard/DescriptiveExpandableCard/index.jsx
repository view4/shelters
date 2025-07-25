import ExpandableCard from "modules/Core/sub-modules/ui-kit/components/Card/ExpandableCard";
import Text from "modules/Core/sub-modules/ui-kit/components/Text";

export const DescriptiveExpandableCard = ({ description, children, ...props }) => (
    <ExpandableCard {...props}>
        <Text>{description}</Text>
        {children}
    </ExpandableCard>
)

export default DescriptiveExpandableCard;