import { onAuthStateChange } from "modules/auth/utils"
import { Fragment, useEffect } from "react"
import cells from "modules/auth/state"
import { useDispatch } from "react-redux";

const { validateToken } = cells;

const OnLoad = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const unSub = onAuthStateChange(async (user) => {
            if(!user) return null
            dispatch(validateToken.action({user}))
        })

        return () => unSub();
    }, []);

    return <Fragment />
}

export default OnLoad   