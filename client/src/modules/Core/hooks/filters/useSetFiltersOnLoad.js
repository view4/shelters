import { useOnLoad } from "../useOnLoad";
import useSetFilters from "./useSetFilters";

export default (action, f) => {
    const {setFilters} = useSetFilters(action);
    useOnLoad(() => setFilters(f), true, [f]);
}