import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import {TRACKING} from "../consts/index";

const track = `
    mutation track($input: TrackInput){
        track(input: $input){
            id
        }
    }
`


const operations = {
    track
}

export default new MiddlewareModule({
    name: TRACKING,
    operations
});

