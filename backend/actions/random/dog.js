let Tc = require("tcomb")
let Express = require("express")
let makeDog = require("common/makers/dog")
let middlewares = require("backend/middlewares")

let router = Express.Router()

router.get("/random",
  middlewares.createParseQuery(Tc.Any),
  function handler(req, res, cb) {
    let item = makeDog()
    let payload = {
      data: item,
    }
    return res.status(200).send(payload) // Status: ok
  }
)

module.exports = router
