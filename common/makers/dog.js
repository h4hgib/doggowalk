let UUID = require("node-uuid")
let Faker = require("faker")
let {merge} = require("common/helpers/common")
let {Dog} = require("common/types")

module.exports = function makeDog(data={}) {
  return Dog(merge({
    id: UUID.v4(),
    name: Faker.name.firstName(),
    manufacturer: Faker.random.arrayElement(["Russia", "USA", "China"]),
    assemblyDate: Faker.date.between("1970-01-01", "1995-01-01"),
  }, data))
}
