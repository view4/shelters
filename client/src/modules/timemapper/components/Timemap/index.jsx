import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { useEffect } from 'react';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import TimemapComponent from '../TimemapComponent';
import feed from 'modules/timemapper/state/feed';

export default strappedConnected(
    TimemapComponent,
    {
        entities: feed.cells.fetchFeed.selectors.getFeed
    },
    {
        fetch: feed.cells.fetchFeed.action,
        setFilters: feed.cells.setFilters.action,
    },
    ({ entities, start, end, setFilters }) => {
        useEffect(() => {
            setFilters({ start, end, shouldRefetch: true });
        }, [start, end]);
    }
);