import createEntityCell from "modules/Core/state/reusableCells/createEntityCell";
import { TIMETRACKER } from "../consts";
import middleware from "../middleware";

export default {
    trackTime: createEntityCell(TIMETRACKER, {name: 'trackTime', requestHandler: middleware.ops.trackTime}),
}