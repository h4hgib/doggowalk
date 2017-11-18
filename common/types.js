let Tc = require("tcomb")

let Uid = Tc.subtype(Tc.String, function (x) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(x)
}, "Uid")

let AlertCategory = Tc.enums.of(["success", "error", "info", "warning"], "AlertCategory")

let Alert = Tc.struct({
  id: Uid,
  message: Tc.String,
  category: AlertCategory,
  closable: Tc.Boolean,
  expire: Tc.Number,
}, "Alert")

let DogName = Tc.subtype(Tc.String, x => {
  return x.length >= 2 && x.length <= 100
}, "DogName")

let DogManufacturer = Tc.enums.of(["China", "Russia", "USA"], "DogManufacturer")

let Dog = Tc.struct({
  id: Uid,
  name: DogName,
  manufacturer: DogManufacturer,
  assemblyDate: Tc.Date,
}, "Dog")

module.exports = {
  Uid, Alert, Dog
}
