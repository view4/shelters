import releases from "../copy";

export const getReleaseContent = (releaseName) => {
    return releases[releaseName];
}