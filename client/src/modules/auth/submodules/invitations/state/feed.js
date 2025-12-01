import FeedModule from "modules/Core/core-modules/FeedModule";
import { INVITATIONS } from "../consts";
import middleware from "../middleware";

export const individualInvitationFeed = new FeedModule({
    name: INVITATIONS + "/individual-invitations",
    cellOptions: {
        createEntityCell: {
            requestHandler: middleware.ops.createInvitation,
        },
        fetchFeedCell: {
            requestHandler: middleware.ops.fetchInvitations,
        },
    },
});

export const selfInvitationFeed = new FeedModule({
    name: INVITATIONS + "/self-invitations",
    cellOptions: {
        createEntityCell: {
            requestHandler: middleware.ops.createSelfInvitation,
        },
        fetchFeedCell: {
            requestHandler: middleware.ops.fetchInviteApplications,
        },
    },
});

export const invitationsLinkFeed = new FeedModule({
    name: INVITATIONS + "/invitations-links",
    cellOptions: {
        createEntityCell: {
            requestHandler: middleware.ops.createInvitationLink,
        },
        fetchFeedCell: {
            requestHandler: middleware.ops.fetchInvitationLinks,
        },
    },
});

