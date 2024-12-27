import { compact } from "lodash";

const func = {};

func.chain = (functions, ...args) => {
    return compact(functions).map(func => func(...args))
}

func.chained = (functions) => {
    return (...args) => func.chain(functions, ...args)
}

func.conditional = (func) => (...args) => compact(args).length && func(...args)

export {func}