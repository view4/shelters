import { noop } from "lodash";

export default (Component, logic = noop, staticProps = null) => (props) => {
    const logicProps = logic?.(props);
    return <Component {...staticProps} {...props} {...logicProps} />
}