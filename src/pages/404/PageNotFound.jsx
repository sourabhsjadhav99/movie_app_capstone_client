import React from "react";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="text-white">
            <ContentWrapper>
                <div className="text-3xl">404</div>
                <div className="text-xl">Page not found!</div>
                <div className="underline hover:font-bold"><Link to={"/"}>Back to home</Link></div>
            </ContentWrapper>
        </div>
    );
};

export default PageNotFound;
