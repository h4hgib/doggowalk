let {range, reduce} = require("ramda")
let makeDog = require("common/makers/dog")
let MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', function (err, db) {
  if (err) throw err

//
//
// 	db.collection('doggos').insertMany([
// {
//   name: "Maisey",
//   image: "http://www.ainf.gi/images/dogs/53/cover.jpg",
//   description: "http://www.ainf.gi/doggy.php?id=53",
//   birth_date: "01-01-2014",
//   gender: "female",
//   activity_level: "Active",
//   social_level: "Social",
//   size: "Medium",
//   strength: "Weak"
// },
// {
//   name: "Jodie",
//   image: "http://www.ainf.gi/images/dogs/58/cover.jpg",
//   description: "http://www.ainf.gi/doggy.php?id=58",
//   birth_date: "01-01-2015",
//   gender: "female",
//   activity_level: "Non Active",
//   social_level: "Semi Social",
//   size: "Medium",
//   strength: "Medium"
// },
// {
//   name: "Jasmine",
//   image: "http://www.ainf.gi/images/dogs/69/cover.jpg",
//   description: "http://www.ainf.gi/doggy.php?id=69",
//   gender: "female",
//   activity_level: "Moderately Active",
//   social_level: "Non Social",
//   size: "Medium",
//   strength: "Strong"
// }
// ]);
//
// 	db.collection('doggos').find().toArray(function (err, result) {
// 		if (err) throw err
// 		console.log(result)
// 	})

})


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
