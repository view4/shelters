import Linkify from "linkify-react";

export default (Component) => (props) => (
    <Linkify>
        <Component {...props} />
    </Linkify>
)