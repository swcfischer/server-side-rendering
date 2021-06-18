import "babel-polyfill";
import express from "express";
import renderer from "./helpers/renderer";
import { matchRoutes } from "react-router-config";

import createStore from "./helpers/createStore";
import routes from "./client/routes";
import proxy from "express-http-proxy";

const app = express();

app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator: (opts) => {
      // Google OAuth flow
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    },
  })
);

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore(req);

  const dataArray = matchRoutes(routes, req.path)
    .map(({ route }) => (route.loadData ? route.loadData(store) : null))
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(dataArray).then(() => {
    const context = {};

    const renderedApp = renderer(req, store, context);

    // server-side redirect
    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }
    res.send(renderedApp);
  });
});

app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
