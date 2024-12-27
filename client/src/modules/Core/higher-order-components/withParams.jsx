import { useParams } from "react-router-dom";

export default (Component) => (props) => {
    let params = useParams();
    return <Component {...props} {...params} />
}