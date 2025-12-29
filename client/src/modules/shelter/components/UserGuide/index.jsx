
import { useNewUserGuide } from "./hook";


const UserGuideComponent = ({ boothId, focusedBoothId }) => {
    const { jsx } = useNewUserGuide(boothId ?? focusedBoothId);
    return <>{jsx}</>
}

export default UserGuideComponent;