import { connect } from "react-redux"
import strapped from "./strapped";

export default (Component, selectors = {}, actions = {}, logic) => {
    const mapStateToProps = selectors && ((state, props) => {
        const payload = {}
        Object.entries(selectors).forEach(([key, selector]) => {
            payload[key] = selector(state, props)
        });
        return payload;
    });

    const mapDispatchToProps = actions && ((dispatch, props) => {
        const payload = {}
        Object.entries(actions).forEach(([key, action]) => {
            payload[key] = (...args) => dispatch(action(...args))
        });
        return payload;
    })

    return connect(mapStateToProps, mapDispatchToProps)(strapped(Component, logic))

}
