let {range, reduce} = require("ramda")
let makeDog = require("common/makers/dog")

// FAKE Db =========================================================================================
function makeDb() {
  return reduce(db => {
    let item = makeDog()
    db[item.id] = item
    return db
  }, {}, range(0, 50))
}

exports.makeDb = makeDb
exports.db = makeDb()
