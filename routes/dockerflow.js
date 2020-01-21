const { router } = require("../lib");
const pkg = require("../package.json");

const $router = router();
$router.get("/__version__", versionHandler);
$router.get("/__heartbeat__", heartbeatHandler);

module.exports = $router;

function versionHandler(req, res) {
  res.json({
    name: pkg.name,
    version: pkg.version,
    sha: "",
    homepage: pkg.homepage
  });
}

function heartbeatHandler(req, res) {
  res.json({}).status(200);
}
