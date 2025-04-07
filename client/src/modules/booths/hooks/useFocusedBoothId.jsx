import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

export default () => {
    const params = useParams();
    const activeBoothId = useSelector((state) => state.booths.activeBooth?.id);
    return useMemo(() => params?.id ?? params?.boothId ?? activeBoothId, [params?.id, params?.boothId, activeBoothId]);
}