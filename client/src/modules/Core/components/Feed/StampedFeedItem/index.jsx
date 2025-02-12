import Stamps from "../../ui-kit/Stamps";
import FeedItem from "../FeedItem";
import Container from "modules/Core/components/ui-kit/Container";;

const formatter = (stamps={}) => Object.entries(stamps)?.map(([key, value]) => value && ({
   text: key,
   timestamp: value
}));

export const FeedItemStamps = ({ createdAt, stamps, ...props }) => (
   <Container>
       <Stamps stamps={stamps ?? {}} formatter={formatter} />
   </Container>
)

const StampedFeedItem = ({ stamps, createdAt, ...props }) => (
   <FeedItem
       headerChildren={
           <FeedItemStamps stamps={stamps} createdAt={createdAt} />
       } {...props}
   />
)

export default StampedFeedItem;

