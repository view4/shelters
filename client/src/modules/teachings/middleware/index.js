import MiddlewareModule from "modules/Core/core-modules/MiddlewareModule";
import { TEACHINGS } from "../consts";

export default new MiddlewareModule({
    name: TEACHINGS,
    operations: {
        upsertMalchutBooth: `
            mutation upsertMalchutBooth($id: String, $input: BoothInput) {
                entity: upsertMalchutBooth(id: $id, input: $input) {
                    id
                }
            }
        `,
        create: `
            mutation upsertDirective($id: String, $input: DirectiveInput) {
                entity: upsertDirective(id: $id, input: $input) {
                    id
                }
            }
        `,
        fetchFeed: `
            query teachings($boothId: String) {
                feed: directives(boothId: $boothId) {
                    entities {
                        id
                        name
                        text
                        comments {
                            id
                            text
                            createdAt
                            updatedAt
                        }
                    }
                    info {
                        totalCount
                    }
                }
            }
        `,
        upsertComment: `
            mutation upsertDirectiveComment($id: String, $input: DirectiveCommentInput) {
                entity: upsertDirectiveComment(id: $id, input: $input) {
                    id
                }
            }
        `,
    }
}); 