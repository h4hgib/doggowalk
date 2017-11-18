let Tc = require("tcomb")
let Express = require("express")
let {Uid, Dog} = require("common/types")
let {parseAs} = require("common/parsers")
let middlewares = require("backend/middlewares")
let {db} = require("backend/dbs/dog")

let router = Express.Router()

router.put("/:id",
  middlewares.createParseParams(Tc.struct({id: Uid})),
  middlewares.createParseQuery(Tc.Any),
  middlewares.createParseBody(Dog),
  function handler(req, res, cb) {
    let oldItem = db[req.params.id]
    let newItem = parseAs(Dog, req.body)
    db[newItem.id] = newItem
    if (oldItem) {
      return res.status(204).send() // Status: no-content
    } else {
      let payload = {
        data: newItem,
      }
      return res.status(201).send(payload) // Status: created
    }
  }
)

module.exports = router
