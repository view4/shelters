import { useCallback, useEffect, useMemo, useState } from 'react';
import { Autocomplete, Chip, MenuItem } from '@mui/material';
import { isString, throttle } from 'lodash';
import Input from 'modules/Core/components/ui-kit/Input';

const defaultParseSearchVariable = (search) => ({ search });
const defaultGetOptionLabel = (option) => option?.readable ?? "";
const SearchableSelect = ({
    selection = [],
    fetchSelection,
    parseSearchVariable = defaultParseSearchVariable,
    onChange,
    value,
    getOptionLabel = defaultGetOptionLabel,
    ...props
}) => {
    const [search, setSearch] = useState('');
    const refetch = useMemo(() => throttle((search) => fetchSelection(parseSearchVariable(search)), 3000, { leading: true }), [fetchSelection, parseSearchVariable]);
    const handleRefetch = useCallback(() => refetch(search), [search, fetchSelection]);

    useEffect(() => {
        handleRefetch();
    }, [search]);

    useEffect(() => {
        const readable = getOptionLabel(value);
        if(readable !== search) setSearch(readable);

    }, [getOptionLabel(value)])

    return (
        <Autocomplete
            options={selection ?? []}
            onInputChange={(e, v) => Boolean(e) && isString(v) && v !== "undefined" && setSearch(v)}
            renderInput={(params) => <Input {...params} value={search} />}
            onChange={(_, v) => onChange(v)}
            filterOptions={(v) => v}
            getOptionLabel={(option) => getOptionLabel(option)}
            renderOption={(props, option) => <MenuItem {...props}>{option.readable} </MenuItem>}
            value={value ?? []}
            inputValue={search}
            autoComplete
            multiple
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                        <Chip variant="outlined" label={option?.readable} key={key} {...tagProps} />
                    );
                })
            }
            {...props}
        />
    )
};

export default SearchableSelect
