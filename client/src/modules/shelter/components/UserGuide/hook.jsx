import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { createSelector } from "@reduxjs/toolkit"
import auth from "modules/auth/state"
import boothCells from "modules/booths/state/index";
import { CreateBoothModal, BoothRequiredModal, UserGuide } from "./component";


const activeCycleIsEmptySelector = createSelector(
    (state) => state.cycles?.entities,
    state => state.cycles?.activeCycleId,
    (cycles, activeCycleId) => activeCycleId && ![
            cycles[activeCycleId]?.a,
            cycles[activeCycleId]?.b,
            cycles[activeCycleId]?.c,
            cycles[activeCycleId]?.d,
            cycles[activeCycleId]?.e,
            cycles[activeCycleId]?.f,
        ].some(gateway => Boolean(gateway?.id))
)

export const useNewUserGuide = (boothId) => {
    const [dismissedGuide, setDismissedGuide] = useState(false);
    const location = useLocation();

    const boothCount = useSelector(auth.validateToken.selectors.boothCount);
    const activeBooths = useSelector(boothCells.fetchActiveBooths.selector);
    // const focusedBoothId = useSelector(boothCells.fetchFocusedBooth.selectors.id);
    const isFetchingBooth = useSelector(boothCells.fetchFocusedBooth.selectors.isLoading);

    // Feed counts for different sections
    const entriesFeedCount = useSelector(state => !state.entries.feedIsLoading && state.entries?.stream?.length);
    const timetrackerFeedCount = useSelector(state => !state.timetracker.feedIsLoading && state.timetracker?.stream?.length);
    const cycleIsEmpty = useSelector(activeCycleIsEmptySelector);
    const roadmapsFeedCount = useSelector(state => !state.roadmaps.feedIsLoading && state.roadmaps?.stream?.length);

    const pathname = location?.pathname || '';
    const isOnBoothsRoute = pathname.includes('/booths');
    const isOnBoothCreateRoute = pathname.includes('/booths/create');
    const isOnEntriesRoute = pathname.includes('/entries');
    const isOnTimemappingRoute = pathname.includes('/time-mapping') || pathname.includes('/timetracker');
    const isOnCyclesRoute = pathname.includes('/cycles');
    const isOnRoadmapsRoute = pathname.includes('/roadmaps');

    const handleDismiss = () => {
        setDismissedGuide(true);
    };

    const isOnBoothSpecificRoute = isOnEntriesRoute || isOnTimemappingRoute || isOnCyclesRoute || isOnRoadmapsRoute;

    const jsx = useMemo(() => {
        // Show big modal only if not on booths routes and user has no booths
        if (boothCount === 0 && !isOnBoothsRoute && !isOnBoothCreateRoute) {
            return <CreateBoothModal />;
        }

        // Show booth required modal if on booth-specific route without a boothId
        if (boothCount > 0 && isOnBoothSpecificRoute && !boothId && !isFetchingBooth) {
            return <BoothRequiredModal />;
        }

        // Don't show guide if user dismissed it
        if (dismissedGuide) {
            return null;
        }

        // Determine guide message based on context
        let mainText = null;
        let subText = null;

        if (boothCount === 0 && (isOnBoothsRoute || isOnBoothCreateRoute)) {
            mainText = "Create your first booth to get started";
        } else if (boothCount > 0 && activeBooths?.length === 0) {
            mainText = "Activate your first booth to get started";
            subText = "Visit the booth's info screen to activate it";
        } else if (isOnEntriesRoute && boothId && entriesFeedCount === 0) {
            mainText = "Create your first entries in this booth";
            subText = "Use this as your own private personal journalling space";
        } else if (isOnTimemappingRoute && boothId && timetrackerFeedCount === 0) {
            mainText = "Dedicate time meaningfully to get started";
            subText = "Be intentional with time";
        } else if (isOnCyclesRoute && boothId && cycleIsEmpty) {
            mainText = "Create/organise your transient set of tasks and keep track of progress";
        } else if (isOnRoadmapsRoute && boothId && roadmapsFeedCount === 0) {
            mainText = "Start roadmapping the way to your goals";
            subText = "Break down that journey into tangible steps";
        }

        if (mainText) {
            return <UserGuide mainText={mainText} subText={subText} onClose={handleDismiss} />;
        }

        return null;
    }, [
        boothCount,
        activeBooths,
        isOnBoothsRoute,
        isOnBoothCreateRoute,
        isOnBoothSpecificRoute,
        isOnEntriesRoute,
        entriesFeedCount,
        timetrackerFeedCount,
        cycleIsEmpty,
        roadmapsFeedCount,
        boothId,
        isFetchingBooth,
        dismissedGuide
    ]);

    return {
        jsx
    };
};