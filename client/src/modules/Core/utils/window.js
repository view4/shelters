export const openInNewTab = (url) => {
    if (url.includes("http://") || url.includes("https://")) return window.open(url, "_blank");
    return window.open("https://" + url, "_blank");
}