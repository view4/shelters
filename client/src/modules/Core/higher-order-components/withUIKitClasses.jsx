import { forwardRef } from "react"
import useClassNames from "../hooks/ui-kit/useClassNames"

export default (Component) => forwardRef((props, ref) => {
    const className = useClassNames(props)
    return <Component {...props} className={className} ref={ref} />
})
