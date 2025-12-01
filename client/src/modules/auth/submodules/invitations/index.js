import CoreModule from "modules/Core/core-modules/CoreModule";
import { INVITATIONS } from "./consts";
import cells from "./state";
import {
  individualInvitationFeed,
  selfInvitationFeed,
  invitationsLinkFeed,
} from "./state/feed";

export default new CoreModule({
  name: INVITATIONS,
  initialState: {
    ...individualInvitationFeed.getInitialFeedState(),
  },
  cells: {
    createIndividualInvitation: individualInvitationFeed.cells?.createEntity,
    fetchIndividualInvitations: individualInvitationFeed.cells?.fetchFeed,
    createSelfInvitation: selfInvitationFeed.cells?.createEntity,
    fetchSelfInvitations: selfInvitationFeed.cells?.fetchFeed,
    createInvitationsLink: invitationsLinkFeed.cells?.createEntity,
    fetchInvitationsLinks: invitationsLinkFeed.cells?.fetchFeed,
    validateInvitation: cells.validateInvitation,
    acceptInvitation: cells.acceptInvitation,
  },
});
