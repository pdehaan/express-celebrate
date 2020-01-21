const { router } = require("../lib");

const $router = router();
$router.use("/", require("./dockerflow"));
$router.use("/", require("./home"));
$router.use("/", require("./name"));

module.exports = $router;
