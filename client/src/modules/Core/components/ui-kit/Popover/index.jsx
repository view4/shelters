import cx from 'classnames';
import React from 'react';
import { Popover as _Popover } from "@mui/material"
import Container from '../Container';
import styles from "./styles.module.scss";

const Popover = ({ 
    children, 
    onClose, 
    anchorElement, 
    bodyClassName, 
    isOpen,
    verticalOrigin = 'bottom',
    horizontalOrigin = 'left',
    ...props
}) => {
    // make popover container fit the content 
    return (
        <_Popover
            // COULDDO: Integrate header and footer into this component - maybe even as a hoc or something there... I'd love a generic way to do this with a hoc or a kind of a hook. 
            open={isOpen}
            onClose={onClose}
            anchorEl={anchorElement}
            anchorOrigin={{
                vertical: verticalOrigin,
                horizontal: horizontalOrigin,
            }}
            transformOrigin={{
                vertical: verticalOrigin,
                horizontal: horizontalOrigin,
            }}
            {...props}
        >
            <Container className={cx(styles.body, bodyClassName)}>
                {children}
            </Container>
        </_Popover>
    )
}

export default Popover



// import * as React from 'react';
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';

// export default function MouseHoverPopover() {
//   const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

//   const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);

//   return (
//     <div>
//       <Typography
//         aria-owns={open ? 'mouse-over-popover' : undefined}
//         aria-haspopup="true"
//         onMouseEnter={handlePopoverOpen}
//         onMouseLeave={handlePopoverClose}
//       >
//         Hover with a Popover.
//       </Typography>
//       <Popover
//         id="mouse-over-popover"
//         sx={{ pointerEvents: 'none' }}
//         open={open}
//         anchorEl={anchorEl}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//         onClose={handlePopoverClose}
//         disableRestoreFocus
//       >
//         <Typography sx={{ p: 1 }}>I use Popover.</Typography>
//       </Popover>
//     </div>
//   );
// }
