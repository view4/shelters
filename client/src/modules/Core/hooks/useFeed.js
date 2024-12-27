import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { noop } from "lodash";
import { useOnLoad } from "./useOnLoad";
import { FEED_BATCH_SIZE } from "../state/consts/feed";
import useSetFiltersOnLoad from "./filters/useSetFiltersOnLoad";

export default ({
  fetcher,
  selector,
  filters,
  loadingSelector = noop,
  hasMoreSelector = noop,
  setFilters,
  feedRef,
  autoFetchOnFiltersChange = true,
}) => {
  const dispatch = useDispatch();
  const feed = useSelector(selector);
  const loading = useSelector(loadingSelector);
  const hasMore = useSelector(hasMoreSelector);

  useSetFiltersOnLoad(setFilters, filters);

  useOnLoad(() => dispatch(fetcher({ renewStream: true })), true, [fetcher]);

  useOnLoad(
    () => dispatch(fetcher({ renewStream: true })),
    autoFetchOnFiltersChange,
    [filters]
  );

  useOnLoad(() => {
    if (Boolean(feedRef)) {
      feedRef.current = {
        fetch: (args) => dispatch(fetcher(args)),
      };
    }
  }, [feedRef]);

  const loadMore = useCallback(() => {
    dispatch(fetcher({ ...filters, segmentSize: FEED_BATCH_SIZE }));
  }, []);

  return useMemo(
    () => ({
      feed,
      loading,
      hasMore,
      loadMore,
    }),
    [feed, loading, hasMore]
  );
};
