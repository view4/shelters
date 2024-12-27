import { ROADMAPS } from "../consts";
import createEntityCell from "modules/Core/state/reusableCells/createEntityCell";
import middleware from "../middleware";
import fetchFeedCell from "modules/Core/state/reusableCells/fetchFeedCell";
import stampEntityCell from "modules/Core/state/reusableCells/stampEntityCell";

export default {
  createGatewayEntity: createEntityCell(ROADMAPS, {
    requestHandler: middleware.ops.createGateway,
    name: "createGatewayEntity",
  }),
  fetchGatewaysFeed: fetchFeedCell(ROADMAPS, {
    requestHandler: middleware.ops.fetchGatewaysFeed,
    name: "fetchGatewaysFeed",
  }),
  stampGateway: stampEntityCell(ROADMAPS, {
    requestHandler: middleware.ops.stampGatewayEntity,
    name: "stampGateway"
  })
};
