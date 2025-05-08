import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

export default () => {
    const params = useParams();
    const focusedBoothId = useSelector((state) => state.booths.focusedBooth?.id);
    return useMemo(() => params?.id ?? params?.boothId ?? focusedBoothId, [params?.id, params?.boothId, focusedBoothId]);
}