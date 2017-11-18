import api from "common/api/dog"
import {Dog} from "common/types"
import {parseAs} from "common/parsers"
import state from "frontend/state"
import ajax from "frontend/ajax"

let dataCursor = state.select(api.plural)
let itemsCursor = dataCursor.select("items")

// Id -> Promise Dog
export default function fetchItem(id) {
  console.debug(api.plural + `.fetchItem(${id})`)

  return ajax.get(api.itemUrl.replace(`:id`, id))
    .then(response => {
      if (response.status.startsWith("2")) {
        let data = response.data.data
        let item = parseAs(Dog, data)
        itemsCursor.set(id, item)
        return item
      } else {
        return undefined
      }
    })
}
