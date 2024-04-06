import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const path = useNavigate();

    const navigateToPreviousPage = () => {
        path(-2);
    };

    return (
        <div>
            <h1>Not Found</h1>
            <button onClick={navigateToPreviousPage}>Go Back</button>
        </div>
    );
};

export default NotFound;