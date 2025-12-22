import React, { useCallback, useState, useEffect, useMemo } from "react";
import c from "classnames";
import Modal from "modules/Core/sub-modules/ui-kit/components/Modal";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Card from "modules/Core/sub-modules/ui-kit/components/Card";
import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
import cells from "modules/auth/state";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "modules/Core/hooks/useStripQueryParams";
import useValidateInvitation from "modules/auth/submodules/invitations/hooks/useValidateInvitation";
import useTabs from "modules/Core/hooks/useTabs";
import EmailCheckStage from "./stages/EmailCheckStage";
import AuthFormStage from "./stages/AuthFormStage";
import RequestInvitationStage from "./stages/RequestInvitationStage";
import RequestSubmittedStage from "./stages/RequestSubmittedStage";
import styles from "./styles.module.scss";

const AuthModal = ({ isOpen, onClose, initialMode = "login", className, login, register }) => {
    const [mode, setMode] = useState(initialMode);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checkingInvitation, setCheckingInvitation] = useState(false);

    const nav = useNavigate();
    const queryParams = useQueryParams({ shouldStrip: false });
    const { validateEmail, validateLinkId, isValidating } = useValidateInvitation();

    const onAuthSuccess = useCallback((res) => {
        if (res) {
            nav("/.");
            onClose?.();
        }
    }, [nav, onClose]);

    const onAuthSubmit = useCallback(() => {
        if (mode === "register") {
            register({ email, password, callback: onAuthSuccess, confirmPassword });
        } else {
            login({ email, password, callback: onAuthSuccess });
        }
    }, [mode, email, password, register, login, onAuthSuccess, confirmPassword]);

    const handleBackToHome = useCallback(() => {
        nav("/");
        onClose?.();
    }, [nav, onClose]);

    // Initialize state for tab navigation
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleEmailCheck = useCallback(async (emailToCheck) => {
        setCheckingInvitation(true);
        const isValid = await validateEmail(emailToCheck || email);
        setCheckingInvitation(false);

        if (isValid) {
            setActiveTabIndex(1); // Move to auth stage
        } else {
            setActiveTabIndex(2); // Go to request invitation
        }
    }, [email, validateEmail]);

    const handleLinkCheck = useCallback(async (linkId) => {
        setCheckingInvitation(true);
        const isValid = await validateLinkId(linkId);
        setCheckingInvitation(false);

        if (isValid) {
            setMode("register");
            setActiveTabIndex(1); // Move to auth stage
        } else {
            setActiveTabIndex(2); // Go to request invitation
        }
    }, [validateLinkId]);

    const onInvitationRequestSuccess = useCallback(() => {
        setActiveTabIndex(3); // Move to request submitted stage
    }, []);

    // Tab configuration with stage components
    const tabs = useMemo(() => [
        {
            title: "Email Check",
            Component: () => (
                <EmailCheckStage
                    email={email}
                    setEmail={setEmail}
                    onContinue={() => handleEmailCheck()}
                    isChecking={checkingInvitation || isValidating}
                    onClose={onClose}
                />
            )
        },
        {
            title: "Auth",
            Component: () => (
                <AuthFormStage
                    mode={mode}
                    setMode={setMode}
                    email={email}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    onSubmit={onAuthSubmit}
                    onSuccess={onAuthSuccess}
                    onClose={onClose}
                />
            )
        },
        {
            title: "Request Invitation",
            Component: () => (
                <RequestInvitationStage
                    email={email}
                    onSuccess={onInvitationRequestSuccess}
                />
            )
        },
        {
            title: "Request Submitted",
            Component: () => (
                <RequestSubmittedStage
                    onBackToHome={handleBackToHome}
                />
            )
        }
    ], [email, mode, password, confirmPassword, checkingInvitation, isValidating, onClose, onAuthSubmit, onAuthSuccess, handleBackToHome, handleEmailCheck, onInvitationRequestSuccess]);

    const { content, focusedTabIndex } = useTabs(tabs, {}, { header: false, activeTabIndex });

    // Check for query params on load
    useEffect(() => {
        if (isOpen) {
            const emailParam = queryParams.email;
            const linkIdParam = queryParams.linkId;

            if (emailParam) {
                setEmail(emailParam);
                handleEmailCheck(emailParam);
            } else if (linkIdParam) {
                handleLinkCheck(linkIdParam);
            }
        }
    }, [isOpen, queryParams.email, queryParams.linkId, handleEmailCheck, handleLinkCheck]);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
            if (!queryParams.email && !queryParams.linkId) {
                setActiveTabIndex(0); // Start at email check
                setEmail("");
            }
            setPassword("");
            setConfirmPassword("");
        }
    }, [initialMode, isOpen, queryParams.email, queryParams.linkId, setActiveTabIndex]);

    // Get card header title based on current tab
    const cardTitle = useMemo(() => {
        const titles = ["Welcome", mode === "login" ? "Login" : "Register", "Request Invitation", "Request Submitted"];
        return titles[focusedTabIndex] || "Welcome";
    }, [focusedTabIndex, mode]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} bodyClassName={c(styles.body, className)}>
            <Container className={styles.container}>
                <Card
                    HeaderComponent={Container}
                    headerProps={{ children: cardTitle, className: styles.header }}
                    className={styles.card}
                >
                    {content}
                </Card>
            </Container>
        </Modal>
    );
};

export default strappedConnected(
    AuthModal,
    {},
    { login: cells.login.action, register: cells.register.action },
    () => ({})
);
