import { get, noop } from "lodash";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import cx from "classnames";
import useFeed from "modules/Core/hooks/useFeed";
import { OverlayLoader } from "modules/Core/sub-modules/ui-kit/components/Loader";
import FeedItem from "./FeedItem";
import LoadMore from "./LoadMore";
import { Container, Text, Title } from "modules/Core/sub-modules/ui-kit/exports";
import withRecursiveRender from "modules/Core/higher-order-components/withRecursiveRender";
import styles from "./styles.module.scss";

const FeedTableHeaderColumn = ({ label, ...props }) => {
    return (
        <Container className={styles.feedTableHeaderColumn} span flex center >
            <Title>{label}</Title>
        </Container>
    )
}

const FeedTableHeader = ({ columns, ...props }) => {
    return (
        <Container className={styles.feedTableHeader} flex maxWidth>
            {columns.map((column) => (
                <FeedTableHeaderColumn key={column.id} label={column.label} {...column} />
            ))}
        </Container>
    )
}

const FeedTableRow = ({ data, onClick, className, ...props }) => {
    return (
        <Container
            className={cx(styles.feedTableRow, className, { [styles.clickable]: onClick })}
            flex
            maxWidth
            onClick={onClick}
        >
            {Object.entries(data).map(([key, value]) => (
                <Container center flex className={styles.feedTableCell} key={key}>
                    <Text text={value.value} />
                </Container>
            ))}
        </Container>
    )
}

const withFeedTableDataAdapter = (Component, columns) => (props) => {
    const data = useMemo(() => {
        const data = {};
        columns.forEach((column) => {
            data[column.key] = {
                // allow for nested keys
                value: column.render ? column.render(props) : column.parser ? column.parser(get(props, column.key)) : get(props, column.key),
                label: column.label,
            };
        });
        return data;
    }, [props]);
    return <Component {...props} data={data} />;
}

const FeedTable = ({ containerClassName, columns, RowComponent = FeedTableRow, table, ...props }) => {
    return (
        <Container className={cx(styles.feedTable, containerClassName)}>
            <FeedTableHeader columns={columns} />
            <Feed {...props} ItemComponent={withFeedTableDataAdapter(RowComponent, columns)} />
        </Container>
    )
}

const _Feed = ({
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
};

const Feed = withRecursiveRender({
    table: FeedTable,
}, _Feed);

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
    EmptyComponent,
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
        {
            !feed?.length && EmptyComponent && <EmptyComponent />
        }
        <LoadMoreComponent
            loadMore={loadMore}
            shouldRender={Boolean(hasMore)}
            className={loadMoreClassName}
        />
    </>
)


export default Feed;