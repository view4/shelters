import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import cells from "../state";
const {validateToken } = cells;
export default (Component) => (props) => {
    const isAuthed = useSelector(validateToken.selectors.isAuthed)
    const nav = useNavigate()
    useEffect(() => {
        if(isAuthed === false) {
            nav("/login")
        }
    }, [isAuthed])
    return <Component {...props} />
}