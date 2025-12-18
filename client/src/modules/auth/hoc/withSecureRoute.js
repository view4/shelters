import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import cells from "../state";
import AuthModal from "../components/AuthModal/__index";

const { validateToken } = cells;

export default (Component, { redirectUrl } = {}) => (props) => {
    const isAuthed = useSelector(validateToken.selectors.isAuthed)
    const isAuthenticating = useSelector(validateToken.selectors.isAuthenticating)
    const nav = useNavigate()
    useEffect(() => {
        if (isAuthed === false && !isAuthenticating && redirectUrl) {
            nav(redirectUrl, { replace: true })
        }
    }, [isAuthed, isAuthenticating, redirectUrl, nav])
    if (isAuthed) return <Component {...props} />
    if (isAuthed === false && !isAuthenticating && redirectUrl) return null
    return !isAuthenticating && isAuthed === false && <>
        <AuthModal
            isOpen={true}
            onClose={() => { }}
            initialMode="login"
        />
    </>
}