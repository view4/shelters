import useClassNames from "../hooks/ui-kit/useClassNames"

export default (Component) => (props) => {
    const className = useClassNames(props)
    return <Component {...props} className={className} /> 
}
