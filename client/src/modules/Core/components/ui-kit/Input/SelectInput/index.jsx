import { MenuItem, Select } from '@mui/material';

const SelectInput = ({ selection, placeholder, onChange, value, parseIsSelected = (key) => value?.includes(key), ...props }) => {
    return (
        <Select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            {...props}
        >
            {selection?.map(
                ({ readable, key }) => (
                    <MenuItem
                        key={key}
                        value={key}
                        disabled={parseIsSelected(key)}
                    >
                        {readable}
                    </MenuItem> 
                )
            )}
        </Select>
    )
}

export default SelectInput;