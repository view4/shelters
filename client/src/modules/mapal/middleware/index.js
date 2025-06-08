import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { MAPAL } from "../consts";

export default new MiddlewareModule({
    name: MAPAL,
    operations: {
        create: `
            mutation upsertMapalBooth($id: String, $input: BoothInput) {
                entity: upsertMapalBooth(id: $id, input: $input) {
                    id
                }
            }
        `
    }
}); 