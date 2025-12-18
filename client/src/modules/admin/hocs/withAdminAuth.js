import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cells from "modules/auth/state";
import NotFoundPage from "modules/shelter/components/screens/NotFoundPage";

const { validateToken } = cells;

const withAdminAuth = (Component) => (props) => {
    const hasAdminRole = useSelector(validateToken.selectors.hasAdminRole);
    const isAuthed = useSelector(validateToken.selectors.isAuthed);
    const isAuthenticating = useSelector(validateToken.selectors.isAuthenticating);
    const nav = useNavigate();

    // useEffect(() => {
    //     // If user is authenticated but doesn't have admin role, redirect to home
    //     if (isAuthed && !isAuthenticating && !hasAdminRole) {
    //         nav("/", { replace: true });
    //     }
    // }, [isAuthed, isAuthenticating, hasAdminRole, nav]);

    // Wait for authentication check to complete
    if (isAuthenticating) {
        return null;
    }

    // If user is authenticated but doesn't have admin role, show not found page
    if (isAuthed && !hasAdminRole) {
        return <NotFoundPage />;
    }

    // If user has admin role, render the component
    if (hasAdminRole) {
        return <Component {...props} />;
    }

    // If user is not authenticated, return null (let withSecureRoute handle it if used together)
    return null;
};

export default withAdminAuth;

