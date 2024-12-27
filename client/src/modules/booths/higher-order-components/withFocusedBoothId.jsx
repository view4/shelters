import useFocusedBoothId from "../hooks/useFocusedBoothId";

export default  (Component) => (props) => {
    const id = useFocusedBoothId();
    return<Component {...props} boothId={id} />
}