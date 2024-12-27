import { useSelector } from "react-redux"
import Loader from "../components/ui-kit/Loader"

export const withLoader = (Component, selector) => ({ loading, ...props }) => {
    const _loading = loading || useSelector(selector)
    return (
        <Loader loading={_loading}>
            <Component {...props} />
        </Loader>
    )
}