import { useCallback, useState } from "react";
import { graphqlClient } from "../middleware";

export const useRequest = (gql) => {
    return useCallback(async (variables) => {
        return await graphqlClient.request(gql, variables);
    }, [gql]);
}

export default (gql, _variables, parseResult = (res) => res) => {
  const [loading, setLoading] = useState(false);
  const handleRequest = useCallback(
    async (variables = _variables) => {
      try {
        setLoading(true);
        const result = await graphqlClient.request(gql, variables);
        return parseResult(result);
      } catch {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [gql, _variables]
  );

  return { handleRequest, loading };
};
