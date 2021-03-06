import {equals, filter} from "ramda"
import {DOG} from "common/constants"
import api from "common/api/dog"
import state from "frontend/state"
import loadIndex from "frontend/actions/load-index/dog"

let urlCursor = state.select("url")
let urlQueryCursor = state.select("urlQuery")
let dataCursor = state.select(api.plural)

export default function establishIndex() {
  console.debug(api.plural + `.establishIndex()`)

  let urlQuery = urlQueryCursor.get()
  let urlFilters = urlQuery.filters
  let urlSorts = urlQuery.sorts
  let urlOffset = urlQuery.offset
  let urlLimit = urlQuery.limit

  let {filters, sorts} = dataCursor.get()

  if (!equals(urlFilters || DOG.index.defaultFilters, filters)) {
    dataCursor.set("filters", urlFilters || DOG.index.defaultFilters)
    if (true || !dataCursor.get("fullLoad")) {
      /* TODO replace true with __newFilters_are_not_subset_of_oldFilters__ */
      // Pagination is messed up, do reset
      dataCursor.merge({
        total: 0,
        pagination: [],
      })
    }
  }
  if (!equals(urlSorts || DOG.index.defaultSorts, sorts)) {
    dataCursor.set("sorts", urlSorts || DOG.index.defaultSorts)
    if (!dataCursor.get("fullLoad")) {
      // Pagination is messed up, do reset
      dataCursor.merge({
        total: 0,
        pagination: [],
      })
    }
  }
  dataCursor.set("offset", urlOffset || 0)
  dataCursor.set("limit", urlLimit || DOG.index.defaultLimit)

  return loadIndex()
}
