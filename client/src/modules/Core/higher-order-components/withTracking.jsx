// import { useCallback, useMemo } from "react";
// import { useOnLoad } from "../hooks/useOnLoad";
// import { useDispatch } from "react-redux";
// import { createEntity } from "../sub-modules/Tracking/state/cells";
// import { TRACKING_TRIGGERS } from "../sub-modules/Tracking/consts";
// // import { useIsAuthenticated } from "modules/Auth/hooks/useConnectedDispatch";

// const useTrack = () => {
//     const dispatch = useDispatch();
//     const authenticated = useIsAuthenticated();
//     // TODO: Anonymous Tracking...? 
//     return useCallback(({ name, text, ...data }) => authenticated && dispatch(createEntity.action({
//         input: {
//             name,
//             data,
//             text
//         }
//     })), [authenticated]);
// }

// const withTrackingOnLoad = (Component, { name }, params) => props => {
//     const track = useTrack();
//     useOnLoad(() => track({ name, ...params }), true, []);
//     return <Component {...props} />
// };

// const withTrackingOnClick = (Component, { name }, params) => props => {
//     const track = useTrack();
//     const onClick = useCallback((...args) => {
//         track({ name, ...params });
//         props.onClick?.(...args);
//     }, [name, ...Object.values(params)]);
//     return <Component {...props} onClick={onClick} />
// }


// const withTracking = (Component, { name, trigger }, staticParams, useParseParams) => (props = {}) => {
//     const dynamicParams = useParseParams(props);
//     const params = useMemo(() => ({ ...staticParams, ...dynamicParams }), [staticParams, dynamicParams]);
//     if (trigger === TRACKING_TRIGGERS.ON_LOAD) return withTrackingOnLoad(Component, { name }, params)(props);
//     if (trigger === TRACKING_TRIGGERS.ON_CLICK) return withTrackingOnClick(Component, { name }, params)(props);
// }

// export default withTracking;