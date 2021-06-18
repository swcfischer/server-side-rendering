import React from "react";

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <div>Page Not Found</div>;
};

export default { component: NotFoundPage };
