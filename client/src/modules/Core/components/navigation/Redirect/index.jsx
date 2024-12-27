import React from "react";
import { useOnLoad } from "modules/Core/hooks/useOnLoad";
import { useNavigate } from "react-router-dom";

const Redirect = ({ to }) => {
    const navigate = useNavigate();
    useOnLoad(() => navigate(to), true, []);
    return <React.Fragment />
};

export default Redirect;