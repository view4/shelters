import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { FEED_INFO_FRAGMENT } from "modules/Core/middleware/const";
import { INVITATIONS } from "../consts";

export default new MiddlewareModule({
    name: INVITATIONS,
    operations: {
        createInvitation: `
            mutation upsertInvitation($input: InvitationInput) {
                upsertInvitation(input: $input) {
                    id
                }
            }
        `,
        fetchInvitations: `
            query invitations($feedParams: FeedParams) {
                feed: invitations(feedParams: $feedParams) {
                    entities {
                        id
                        email
                        createdAt
                    }
                    ${FEED_INFO_FRAGMENT}
                }
            }
        `,
        createInvitationLink: `
            mutation upsertInvitationLink($input: InvitationLinkInput) {
                upsertInvitationLink(input: $input) {
                    id
                }
            }
        `,
        fetchInvitationLinks: `
            query invitationLinks($feedParams: FeedParams) {
                feed: invitationLinks(feedParams: $feedParams) {
                    entities {
                        id
                        redemptionLimit
                        createdAt
                        description
                    }
                    ${FEED_INFO_FRAGMENT}
                }
            }
        `,
        validateInvitation: `
            query validateInvitation($email: String, $linkId: String) {
                isValid: validateInvitation(email: $email, linkId: $linkId)
            }
        `,
        acceptInvitation: `
            mutation acceptInvitation($email: String, $linkId: String) {
                acceptInvitation(email: $email, linkId: $linkId)
            }
        `,
        createSelfInvitation: `
            mutation upsertInviteApplication($input: InvitationApplicationInput) {
                upsertInviteApplication(input: $input) {
                    id
                }
            }
        `,
        fetchInviteApplications: `
            query inviteApplications($feedParams: FeedParams) {
                feed: inviteApplications(feedParams: $feedParams) {
                    entities {
                        id
                        text
                        email
                        name
                    }
                    ${FEED_INFO_FRAGMENT}
                }
            }
        `,
    },
});
