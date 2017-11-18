import {append, assoc, reject} from "ramda"
import UUID from "uuid"
import api from "common/api/dog"
import {Dog} from "common/types"
import {parseAs} from "common/parsers"
import state from "frontend/state"
import {router} from "frontend/router"
import ajax from "frontend/ajax"

let urlCursor = state.select("url")
let dataCursor = state.select(api.plural)
let itemsCursor = dataCursor.select("items")

// Object -> Promise Dog
export default function addItem(data) {
  console.debug(api.plural + `.addItem(...)`)

  data = assoc("id", data.id || UUID.v4(), data)
  let item = parseAs(Dog, data)
  let id = item._id

  // Optimistic update
  dataCursor.apply("total", t => t + 1)
  itemsCursor.set(id, item)

  if (dataCursor.get("fullLoad")) {
    // Inject new id at whatever place
    dataCursor.apply("pagination", ps => append(id, ps))
  } else {
    // Pagination is messed up, do reset
    dataCursor.merge({
      total: 0,
      pagination: [],
    })
  }

  if (urlCursor.get("route") == api.singular + "-add") {
    setImmediate(() => {
      router.transitionTo(api.singular + "-detail", {id: item._id})
    })
  }

  return ajax.put(api.itemUrl.replace(":id", id), item)
    .then(response => {
      let {total, items, pagination} = dataCursor.get()
      if (response.status.startsWith("2")) {
        if (response.status == "200" && response.data.data) {
          item = itemsCursor.set(id, parseAs(Dog, response.data.data))
        }
        return item
      } else {
        itemsCursor.unset(id)
        dataCursor.apply("total", t => t ? t - 1 : t)
        dataCursor.apply("pagination", ps => reject(id => id == item._id, ps))
        throw Error(response.statusText)
      }
    })
}
