import BoothsLink from "./BoothsLink";

export const links = [
    {
        text: "Roadmaps",
        to: "/roadmaps"
    },
    {
        text: "Cycles",
        to: "/cycles"
    },
    {
        text: "Entries",
        to: "/entries"
    },
    {
        text: "Time",
        to: "/time-mapping"
    },
    {
        text: "Info",
        to: "/info"
    },
    {
        text: "Booths",
        to: "/booths",
        ignoreRouteParams: true,
        Component: BoothsLink
    },
    {
        text: "Settings",
        to: "/membership/settings",
        ignoreRouteParams: true
    },
];

export const WITH_PARAMS_PREFIX = `/booths/:boothId`

