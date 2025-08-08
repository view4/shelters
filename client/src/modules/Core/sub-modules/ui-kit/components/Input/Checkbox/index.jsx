import { noop } from "lodash";

const Checkbox = ({ onChange = noop, ...props }) => (
    <input 
        type="checkbox" 
        onChange={e => onChange(e.target.checked)} 
        {...props} 
    />
)

export default Checkbox;