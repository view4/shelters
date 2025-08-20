import { useState, useRef } from "react";
import SidemenuLink from "../SidemenuLink";
import ActiveBoothsPreview from "modules/booths/components/ActiveBoothsPreview";

const BoothsLink = ({ ...props }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    return (
        <>
            <SidemenuLink
                containerRef={containerRef}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                to="/booths"
                text="Booths"
                {...props}
            >
                <ActiveBoothsPreview 
                    onClose={() => setIsOpen(false)} 
                    isOpen={isOpen} 
                    containerElement={containerRef.current} 
                    onBoothClick={() => setIsOpen(false)}
                />
            </SidemenuLink>
        </>
    )
};

export default BoothsLink;