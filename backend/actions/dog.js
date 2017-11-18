let indexRouter = require("./index/dog")
let addRouter = require("./add/dog")
let addOrEditRouter = require("./add-or-edit/dog")
let removeRouter = require("./remove/dog")
let randomRouter = require("./random/dog")
let detailRouter = require("./detail/dog")

module.exports = [
  indexRouter,
  addRouter,
  addOrEditRouter,
  removeRouter,
  randomRouter,
  detailRouter
]
