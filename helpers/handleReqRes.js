const { StringDecoder } = require("string_decoder");
const url = require("url");
const routes = require("../routes");
const { notFoundHandler } = require("../handler/routeHandler/notFoundHandler");
const handler = {};

handler.handleReqRes = (req, res) => {
  const requestProperties = {};
  //URL Parsed
  requestProperties.parsedUrl = url.parse(req.url, true);
  requestProperties.path = requestProperties.parsedUrl.pathname;
  requestProperties.trimmedPath = requestProperties.path.replace(
    /^\/+|\/+$/g,
    ""
  );
  requestProperties.method = req.method.toLowerCase();
  requestProperties.queryObjet = requestProperties.parsedUrl.query;
  requestProperties.headers = req.headers;

  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const chosenHandler = routes[requestProperties.trimmedPath]
    ? routes[requestProperties.trimmedPath]
    : notFoundHandler;

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      res.writeHead(statusCode);
      res.end(payloadString);
    });
    res.end("Hello Zahid");
  });
};

module.exports = handler;
