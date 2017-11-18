let Tc = require("tcomb")
let Express = require("express")
let {merge} = require("common/helpers/common")
let {Dog} = require("common/types")
let {parseAs} = require("common/parsers")
let makeDog = require("common/makers/dog")
let middlewares = require("backend/middlewares")
let {db} = require("backend/dbs/dog")

let router = Express.Router()

router.post("/",
  middlewares.createParseQuery(Tc.Any),
  middlewares.createParseBody(Dog),
  function handler(req, res, cb) {
    let item = parseAs(Dog, merge(makeDog(), req.body))
    db[item.id] = item
    let payload = {
      data: item,
    }
    return res.status(201).send(payload) // Status: created
  }
)

module.exports = router
