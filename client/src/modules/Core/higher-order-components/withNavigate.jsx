import { useNavigate } from "react-router-dom"

export default (Component) => {
    const navigate = useNavigate();
    return (props) => <Component {...props} navigate={navigate} />
}