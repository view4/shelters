import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import cells from "../state";
import AuthModal from "../components/AuthModal";

const { validateToken } = cells;

export default (Component) => (props) => {
    const isAuthed = useSelector(validateToken.selectors.isAuthed)
    const isAuthenticating = useSelector(validateToken.selectors.isAuthenticating)
    const nav = useNavigate()
    console.log({ isAuthed, isAuthenticating })
    if (isAuthed) return <Component {...props} />
    return !isAuthenticating && isAuthed === false && <>
        <AuthModal
            isOpen={true}
            onClose={() => { }}
            initialMode="login"
        />
    </>
}