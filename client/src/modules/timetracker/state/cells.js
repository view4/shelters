import createEntityCell from "modules/Core/state/reusableCells/createEntityCell";
import { TIMETRACKER } from "../consts";
import middleware from "../middleware";
import fetchFeedCell from "modules/Core/state/reusableCells/fetchFeedCell";

export default {
    trackTime: createEntityCell(TIMETRACKER, {name: 'trackTime', requestHandler: middleware.ops.trackTime}),
    fetchTrackedTimeFeed: fetchFeedCell(TIMETRACKER, {name: 'fetchTrackedTimeFeed', requestHandler: middleware.ops.fetchTrackedTimeFeed}),
}