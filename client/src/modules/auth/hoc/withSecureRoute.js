import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import cells from "../state";
import AuthModal from "../components/AuthModal";

const { validateToken } = cells;

export default (Component) => (props) => {
    const isAuthed = useSelector(validateToken.selectors.isAuthed)
    const nav = useNavigate()
    if (isAuthed) return <Component {...props} />
    return <>
        {/* Maybe add some custom copy/text here */}
        <AuthModal
            isOpen={true}
            onClose={() => { }}
            initialMode="login"
        />
    </>
}