export const safeParseJson = (str, defaultVal = str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return defaultVal;
    }
}