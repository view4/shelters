// import cx from 'classnames';
// import React, { lazy, Suspense } from 'react';
// import strappedConnected from "modules/Core/higher-order-components/strappedConnected";
// import displayUserGuide from "modules/Core/sub-modules/Dialog/state/cells/displayUserGuide";
// import authorizeToken from 'modules/Auth/state/cells/authorizeToken';
// import styles from "./styles.module.scss"

// const Button = lazy(() => import('modules/Core/sub-modules/ui-kit/components/Button'))

// const Component = (props) => (
//     <Suspense fallback={<React.Fragment />}>
//         <Button {...props} />
//     </Suspense>
// )

// export default strappedConnected(
//     Component,
//     {
//         settings: authorizeToken.selectors.getUserSettings
//     },
//     { displayUserGuide: (key) => displayUserGuide.action({ key }) },
//     ({ displayUserGuide, userGuideKey, className, settings }) => {
//         return ({
//             onClick: (() => displayUserGuide(userGuideKey)),
//             text: '?',
//             shouldRender: Boolean(settings?.displayUserGuide && userGuideKey),
//             className: cx(styles.button, className),
//         })
//     }
// );
