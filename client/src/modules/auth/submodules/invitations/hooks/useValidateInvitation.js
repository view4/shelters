// have a hook which utilised the validateInvitationCell it will accept the linkId or the email.... 
//  if it is a valid linkId then it can be stored within the local storage and be cleared from url params 
// if email also it can be stored within the local storage... 

import { useCallback } from "react";
import { useDispatch } from "react-redux";


export default () => {
    const dispatch = useDispatch();
    const validateLinkId = useCallback(() => {
        const linkId = useQueryParams().linkId;
        if (!linkId) return false;
        return validateInvitationCell.action({ linkId });
    }, [validateInvitationCell]);

    const validateEmail = useCallback(() => {
        const email = useQueryParams().email;
        if (!email) return false;
        return validateInvitationCell.action({ email });
    }, [validateInvitationCell]);

    hasValidInvitation = useCallback(() => {
        localStorage.getItem('linkId') || localStorage.getItem('email');
    }, [validateLinkId, validateEmail]);

    return {
        validateLinkId,
        validateEmail,
        hasValidInvitation,
    }
}