import Feed from "modules/Core/components/Feed";
import { INITIAL_FEED_STATE } from "modules/Core/state/consts/feed";
import createEntityCell from "modules/Core/state/reusableCells/createEntityCell";
import fetchEntityCell from "modules/Core/state/reusableCells/fetchEntityCell";
import fetchFeedCell from "modules/Core/state/reusableCells/fetchFeedCell";
import removeEntityCell from "modules/Core/state/reusableCells/removeEntityCell";
import setFiltersCell from "modules/Core/state/reusableCells/setFiltersCell";
import setNestedFiltersCell from "modules/Core/state/reusableCells/setNestedFiltersCell";
import stampEntityCell from "modules/Core/state/reusableCells/stampEntityCell";

class FeedModule {
    constructor({ name, initialFeedState = {}, cellOptions = {} }) {
        this.name = name;
        this.initialFeedState = initialFeedState;
        this.initCells(cellOptions);
    }

    getInitialFeedState = () => ({
        ...INITIAL_FEED_STATE,
        ...this.initialFeedState,
    })

    initCells = (options) => {
        this.setFiltersCell = setFiltersCell(this.name, options?.setFiltersCell ?? {});
        this.createEntityCell = createEntityCell(this.name, options?.createEntityCell ?? {});
        this.fetchFeedCell = fetchFeedCell(this.name, options?.fetchFeedCell ?? {});
        this.fetchEntityCell = fetchEntityCell(this.name, options?.fetchEntityCell ?? {});
        this.setNestedFiltersCell = setNestedFiltersCell(this.name, options?.setNestedFeedCell ?? {});
        this.removeEntityCell = removeEntityCell(this.name, options?.removeEntityCell ?? {});
        this.stampEntityCell = stampEntityCell(this.name, options?.stampEntityCell ?? {});
    }

    FeedComponent = ({ ...props }) => (
        <Feed
            setFilters={this.setFiltersCell.action}
            feedSelector={this.fetchFeedCell.selectors.getFeed}
            loadFeed={this.fetchFeedCell.action}
            loadingSelector={this.fetchFeedCell.selectors.getIsLoading}
            hasMoreSelector={this.fetchFeedCell.selectors.getFeedHasMore}
            {...props}
        />
    )

    withFeedCell = ({ feedCell, setFiltersCell }, Component = Feed,) => (props) => (
        //TODO: add/integrate fetch nested into this class pls. 
        <Component
            setFilters={setFiltersCell.action}
            feedSelector={feedCell.selectors.getFeed}
            loadFeed={feedCell.action}
            loadingSelector={feedCell.selectors.getIsLoading}
            hasMoreSelector={feedCell.selectors.getFeedHasMore}
            {...props}
        />
    )

    get cells() {
        return ({
            setFilters: this.setFiltersCell,
            createEntity: this.createEntityCell,
            fetchFeed: this.fetchFeedCell,
            fetchEntity: this.fetchEntityCell,
            setNestedFilters: this.setNestedFiltersCell,
            removeEntity: this.removeEntityCell,
            stampEntity: this.stampEntityCell,
        })
    }
}


export default FeedModule;