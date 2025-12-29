import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import invitationCells from "../state";

export default () => {
    const dispatch = useDispatch();
    const [isValidating, setIsValidating] = useState(false);

    const validateInvitation = useCallback(async ({ email, linkId }) => {
        if (!email && !linkId) return false;
        
        setIsValidating(true);
        try {
            const result = await dispatch(invitationCells.validateInvitation.action({ email, linkId }));
            setIsValidating(false);
            return result?.isValid || false;
        } catch (error) {
            setIsValidating(false);
            return false;
        }
    }, [dispatch]);

    const validateEmail = useCallback(async (email) => {
        return validateInvitation({ email });
    }, [validateInvitation]);

    const validateLinkId = useCallback(async (linkId) => {
        return validateInvitation({ linkId });
    }, [validateInvitation]);

    return {
        validateInvitation,
        validateEmail,
        validateLinkId,
        isValidating,
    }
}