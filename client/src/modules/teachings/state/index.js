import createEntityCell from "modules/Core/state/reusableCells/createEntityCell";
import { TEACHINGS } from "../consts";
import middleware from "../middleware";

export default {
    upsertBooth: createEntityCell(
        TEACHINGS,
        {
            name: "upsertBooth",
            requestHandler: middleware.ops.upsertMalchutBooth
        }
    ),
    upsertComment: createEntityCell(
        TEACHINGS,
        {
            name: "upsertComment",
            requestHandler: middleware.ops.upsertComment
        }
    ),
    upsertVote: createEntityCell(
        TEACHINGS,
        {
            name: "upsertVote",
            requestHandler: middleware.ops.upsertVote
        }
    )
}