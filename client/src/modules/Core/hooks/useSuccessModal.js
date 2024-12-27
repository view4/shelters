import React, { useMemo } from "react";
import SuccessModal from "../components/SuccessModal";
import {func} from "../utils/func";
import {useIsOpen} from "./useIsOpen";

export const useSuccessModal = ({ text = "Successfull", onClose }) => {
    const { isOpen, close, open } = useIsOpen()
    
    const modal = useMemo(() => (
        <SuccessModal text={text} onClose={func.chained([onClose, close])} isOpen={isOpen} />
    ), [text, onClose, close, isOpen]);
    
    return {
        openSuccessModal: open, closeSuccessModal: close, modal
    }
}
