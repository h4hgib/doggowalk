let Tc = require("tcomb")
let Express = require("express")
let {Uid} = require("common/types")
let middlewares = require("backend/middlewares")
let {db} = require("backend/dbs/dog")
let MongoClient = require('mongodb').MongoClient

let router = Express.Router()

router.get("/:id",
  middlewares.createParseQuery(Tc.Any),
  function handler(req, res, cb) {
		MongoClient.connect('mongodb://localhost:27017/animals', function (err, db) {
			if (err) throw err

			db.collection('doggos').find({name: 'Jasmine'}).toArray(function (err, result) {
				if (err) throw err
				console.log(result)
				let item = result[0]
				if (item) {
					let payload = {
						data: item,
					}
					return res.status(200).send(payload) // Status: ok
				} else {
					return cb()
				}
			})

		})
  }
)

module.exports = router
