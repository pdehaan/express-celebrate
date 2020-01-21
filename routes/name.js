const {
  router,
  celebrate,
  Segments: { QUERY },
  types: { string }
} = require("../lib");

const $schema = celebrate({
  [QUERY]: {
    name: string.required()
  }
});

const $router = router();
$router.get("/name", $schema, handler);

module.exports = $router;

function handler(req, res) {
  res.send(`/name is, "${req.query.name}"`);
}
