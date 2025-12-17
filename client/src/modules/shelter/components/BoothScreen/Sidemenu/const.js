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
        text: "Subscription",
        to: "/membership",
        ignoreRouteParams: true,


    },
    {
        text: "Logout",
        to: "/logout",
        ignoreRouteParams: true,
        // Component: LogoutLink
    }
    // {
    //     text: "Settings",
    //     to: "/membership/settings",
    //     ignoreRouteParams: true
    // },
];

export const WITH_PARAMS_PREFIX = `/booths/:boothId`
