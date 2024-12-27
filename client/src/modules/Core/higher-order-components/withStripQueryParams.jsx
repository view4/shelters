import useStripQueryParams from "../hooks/useStripQueryParams";

export default (Component) => (props) => {
    const params = useStripQueryParams();
    return <Component {...props} {...params} />
}