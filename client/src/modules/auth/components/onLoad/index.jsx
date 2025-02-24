import { auth, onAuthStateChange } from "modules/auth/utils"
import { Fragment, useEffect } from "react"
import {validateToken} from "modules/auth/state"

const onLoad = () => {
    const dispatch = useDispatch();
    useEffect(() => {

        const unSub = onAuthStateChange(auth, async (user) => {
            if(!user) {
                return;
            }
            dispatch(validateToken.action({user}))
        })

        return () => unSub();
    }, []);

    return <Fragment />
}

export default onLoad