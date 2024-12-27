import { useMemo } from "react";

export default ({
    condition,
    deps = [condition], 
    onTrue,
    onElse
}) => useMemo(() => condition ? onTrue : onElse, deps)