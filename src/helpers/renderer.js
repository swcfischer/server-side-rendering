import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import serialize from "serialize-javascript";
import { renderRoutes } from "react-router-config";
import routes from "../client/routes";
import { Provider } from "react-redux";
import Helmet from "react-helmet";

export default (req, store, context) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(routes)}</div>
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `
    <html>
    <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    </head>
    <body>
      <div id="root">${content}</div>
      <script>
        window.INITIAL_STATE = ${serialize(store.getState())}
      </script>
      <script src="bundle.js"></script>
    </body>
    </html>
  `;
};
