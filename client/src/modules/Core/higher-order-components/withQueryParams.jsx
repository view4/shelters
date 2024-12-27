import { useQueryParams } from "../hooks/useStripQueryParams";

export default (Component) => (props) => {
    const params = useQueryParams({shouldStrip: false});
    return <Component {...props} {...params} />
}