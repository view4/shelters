import { useDispatch } from "react-redux";
import {onSuccess } from "../state/cells";

export default () => {
    const dispatch = useDispatch();
    return (message) => dispatch(onSuccess(message));
}
