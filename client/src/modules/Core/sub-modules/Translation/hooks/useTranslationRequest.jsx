import { useMemo } from "react";
import useMiddleware from "modules/Core/hooks/useMiddleware";
import { translationQuery } from "../middleware";

const parseTranslationResult = (result) => result?.translate?.text;
export default (text, language) => {
    const variables = useMemo(() => ({
        text,
        target: language
    }), [text, language]);

    return useMiddleware(translationQuery, variables, parseTranslationResult);
}
