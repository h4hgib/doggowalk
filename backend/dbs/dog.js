let {range, reduce} = require("ramda")
let makeDog = require("common/makers/dog")
let MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', function (err, db) {
  if (err) throw err

	db.collection('doggos').deleteMany()

	db.collection('doggos').insertMany([
	{
	  name: "Maisey",
	  image: "http://www.ainf.gi/images/dogs/53/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=53",
	  birth_date: "2014-01-01",
	  gender: "female",
	  activity_level: "Active",
	  social_level: "Social",
	  size: "Medium",
	  strength: "Weak",
	  last_time_walked: "2017-11-11"
	},
	{
	  name: "Jodie",
	  image: "http://www.ainf.gi/images/dogs/58/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=58",
	  birth_date: "2015-01-01",
	  gender: "female",
	  activity_level: "Non Active",
	  social_level: "Semi Social",
	  size: "Medium",
	  strength: "Medium",
	  last_time_walked: "2017-11-18"
	},
	{
	  name: "Jasmine",
	  image: "http://www.ainf.gi/images/dogs/69/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=69",
	  birth_date: "2013-11-01",
	  gender: "female",
	  activity_level: "Moderately Active",
	  social_level: "Non Social",
	  size: "Medium",
	  strength: "Strong",
	  last_time_walked: "2017-11-16"
	},
	{
	  name: "Wilbur",
	  image: "http://www.ainf.gi/images/dogs/60/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=60",
	  birth_date: "2013-01-11",
	  gender: "male",
	  activity_level: "Moderately Active",
	  social_level: "Semi Social",
	  size: "Medium",
	  strength: "Strong",
	  last_time_walked: "2017-12-11"
	},
	{
	  name: "Rusty",
	  image: "http://www.ainf.gi/images/dogs/61/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=61",
	  birth_date: "2015-08-08",
	  gender: "male",
	  activity_level: "Moderately Active",
	  social_level: "Social",
	  size: "Small",
	  strength: "Weak",
	  last_time_walked: "2017-11-17"
	},
	{
	  name: "Zeus",
	  image: "http://www.ainf.gi/images/dogs/62/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=62",
	  birth_date: "2015-11-01",
	  gender: "male",
	  activity_level: "Active",
	  social_level: "Social",
	  size: "Big",
	  strength: "Strong",
	  last_time_walked: "2017-11-14"
	},
	{
	  name: "Oscar",
	  image: "http://www.ainf.gi/images/dogs/65/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=65",
	  birth_date: "2014-10-01",
	  gender: "male",
	  activity_level: "Active",
	  social_level: "Semi Social",
	  size: "Medium",
	  strength: "Strong",
	  last_time_walked: "2017-11-12"
	},
	{
	  name: "Radar",
	  image: "http://www.ainf.gi/images/dogs/74/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=74",
	  birth_date: "2013-06-01",
	  gender: "male",
	  activity_level: "Active",
	  social_level: "Semi Social",
	  size: "Big",
	  strength: "Strong",
	  last_time_walked: "2017-09-11"
	},
	{
	  name: "Blue",
	  image: "http://www.ainf.gi/images/dogs/79/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=79",
	  birth_date: "2015-03-01",
	  gender: "male",
	  activity_level: "Semi Active",
	  social_level: "Non Social",
	  size: "Big",
	  strength: "Strong",
	  last_time_walked: "2017-11-11"
	},
	{
	  name: "Aria",
	  image: "http://www.ainf.gi/images/dogs/85/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=85",
	  birth_date: "2016-04-01",
	  gender: "female",
	  activity_level: "Semi Active",
	  social_level: "Semi Social",
	  size: "Small",
	  strength: "Medium",
	  last_time_walked: "2017-11-16"
	},
	{
	  name: "Teddy",
	  image: "http://www.ainf.gi/images/dogs/87/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=87",
	  birth_date: "2015-09-20",
	  gender: "male",
	  activity_level: "Semi Active",
	  social_level: "Non Social",
	  size: "Small",
	  strength: "Weak",
	  last_time_walked: "2017-11-14"
	},
	{
	  name: "Kiara",
	  image: "http://www.ainf.gi/images/dogs/94/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=94",
	  birth_date: "2013-09-08",
	  gender: "female",
	  activity_level: "Non Active",
	  social_level: "Semi Social",
	  size: "Medium",
	  strength: "Weak",
	  last_time_walked: "2017-11-12"
	},
	{
	  name: "Jack",
	  image: "http://www.ainf.gi/images/dogs/89/cover.jpg",
	  description: "http://www.ainf.gi/doggy.php?id=98",
	  birth_date: "2012-12-01",
	  gender: "female",
	  activity_level: "Active",
	  social_level: "Social",
	  size: "Medium",
	  strength: "Medium",
	  last_time_walked: "2017-11-17"
	}
	]);

	db.collection('doggos').find().toArray(function (err, result) {
		if (err) throw err
		console.log(result)
	})

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
