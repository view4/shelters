import { gql } from "graphql-request";

export const translationQuery = gql`
    query translate($text: String!, $target: String!) {
        translate(text: $text, target: $target) {
            text
        }
    }
`