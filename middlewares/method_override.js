const methodOverride = require("method-override");

function callback(req, res) {
  if (req.body && typeof req.body === "object" && "_method" in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}

module.exports = methodOverride(callback);
