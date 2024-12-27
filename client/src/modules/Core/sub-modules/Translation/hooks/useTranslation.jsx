import { useCallback, useEffect, useMemo, useState } from "react";
import { useIsOpen } from "modules/Core/hooks/useIsOpen";
import { getLStorage, setLStorage } from "modules/Core/utils/lStorage";
import DefaultLanguageModal from "../components/DefaultLanguageModal";
import useTranslationRequest from "./useTranslationRequest";

export default (defaultText) => {
    const { isOpen, open, close } = useIsOpen(false);
    const [text, setText] = useState();
    const [lang, setLang] = useState();

    const {handleRequest: translate, loading} = useTranslationRequest(text, lang);
    useEffect(() => {
        setText(defaultText)
    }, [defaultText]);

    useEffect(() => {
        const lang = getLStorage('lang');
        setLang(lang);
    }, []);

    const handleSetLanguage = useCallback((lang) => {
        setLang(lang);
        setLStorage('lang', lang);
    }, [setLang])

    const modal = useMemo(() => (
        <DefaultLanguageModal
            language={lang}
            setLanguage={handleSetLanguage}
            isOpen={isOpen}
            close={close}
        />
    ), [isOpen, lang, handleSetLanguage, close]);

    const handleTranslate = useCallback(async () => {
        const text = await translate();
        setText(text);
    }, [translate])

    return {
        text,
        modal,
        openModal: open,
        language: useMemo(() => lang?.toUpperCase(), [lang]),
        translate: () => lang ? handleTranslate() : open(),
        loading
    }
};