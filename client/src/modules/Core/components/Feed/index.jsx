import { noop } from "lodash";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import useFeed from "modules/Core/hooks/useFeed";
import { OverlayLoader } from "modules/Core/sub-modules/ui-kit/components/Loader";
import FeedItem from "./FeedItem";
import LoadMore from "./LoadMore";

const Feed = ({
    feedSelector,
    loadingSelector = noop,
    loadFeed,
    feedItemClassName,
    redirectOnClickByIdRootUrl,
    onClick,
    filters,
    hasMoreSelector,
    setFilters,
    feedRef,
    ...props
}) => {
    const { feed, loading, hasMore, loadMore } = useFeed({
        fetcher: loadFeed,
        selector: feedSelector,
        filters,
        loadingSelector,
        hasMoreSelector,
        setFilters,
        feedRef
    });

    const navigate = useNavigate();
    const handleOnClick = useMemo(() => {
        if (onClick) return onClick;
        if (redirectOnClickByIdRootUrl) return ({ id }) => navigate(redirectOnClickByIdRootUrl + id);
        return noop;
    }, [redirectOnClickByIdRootUrl, onClick, navigate]);
    return (
        <Feed.Component
            feed={feed}
            onClick={handleOnClick}
            className={feedItemClassName}
            loading={loading}
            hasMore={hasMore}
            loadMore={loadMore}
            {...props}
        />
    )
}

Feed.Component = ({
    feed = [],
    ItemComponent = FeedItem,
    onClick = noop,
    loading,
    className,
    loadMore = noop,
    hasMore,
    itemProps,
    LoadMoreComponent = LoadMore,
    loadMoreClassName,
}) => (
    <>
        <OverlayLoader loading={loading} />
        {
            feed?.map((item, i) => (
                <ItemComponent
                    className={className}
                    {...itemProps}
                    {...item}
                    key={i}
                    onClick={() => onClick(item)}
                />
            ))
        }
        <LoadMoreComponent
            loadMore={loadMore}
            shouldRender={Boolean(hasMore)}
            className={loadMoreClassName}
        />
    </>
)


export default Feed;