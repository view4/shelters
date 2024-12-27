import { useDispatch } from "react-redux";
import { onError } from "../state/cells";

export default () => {
    const dispatch = useDispatch();
    return (message) => dispatch(onError(message));
}
