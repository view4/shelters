import { Autocomplete, Chip, MenuItem } from '@mui/material';
import { isString, throttle } from 'lodash';
import Input from 'modules/Core/components/ui-kit/Input';
import { useCallback, useEffect, useMemo, useState } from 'react';

const SearchableSelect = ({
    selection = [],
    fetchSelection,
    parseSearchVariable = (search) => ({ search }),
    onChange,
    value,
    ...props
}) => {
    const [search, setSearch] = useState('');
    const refetch = useMemo(() => throttle((search) => fetchSelection(parseSearchVariable(search)), 3000, { leading: true }), [fetchSelection, parseSearchVariable]);
    const handleRefetch = useCallback(() => {
        refetch(search);
    }, [search, fetchSelection]);

    useEffect(() => {
        handleRefetch();
    }, [search]);

    return (
        <Autocomplete
            options={selection ?? []}
            onInputChange={(e, v) => Boolean(e) && isString(v) && setSearch(v)}
            renderInput={(params) => <Input {...params} value={search} />}
            onChange={(_, v) => onChange(v)}
            filterOptions={(v) => v}
            getOptionLabel={(option) => option.readable}
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
