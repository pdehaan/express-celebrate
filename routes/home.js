const {
  router,
  celebrate,
  Segments: { QUERY },
  types: { number, string }
} = require("../lib");

const $schema = celebrate(
  {
    [QUERY]: {
      name: string.default("stranger"),
      age: number.integer()
    }
  },
  { abortEarly: false }
);

const $router = router();
$router.get("/", $schema, handler);

module.exports = $router;

function handler(req, res) {
  res.send(`Hello, ${JSON.stringify(req.query)}`);
}
