import { useSelector } from "react-redux"
import cells from "../state"

const { validateToken } = cells;

export default () => {
    const isAuthed = useSelector(validateToken.selectors.isAuthed)
    return { isAuthed }
}