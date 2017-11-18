import {filter, find, forEach, identity, keys, map, pipe, propEq, slice, sortBy, tap, values} from "ramda"
import Baobab from "baobab"
import throttle from "lodash.throttle"
import {filterByAll, sortByAll} from "common/helpers/common"
import {parseQuery} from "common/helpers/jsonapi"
import {ALERT, DOG} from "common/constants"
import dogApi from "common/api/dog"

let monkey = Baobab.monkey

window._state = new Baobab(
  {
    url: {
      route: undefined,
      path: undefined,
      params: {},
      query: {},
    },

    ajaxQueue: [],

    alertQueue: [],
    alertTimeout: undefined,

    dogs: {
      // DATA
      total: 0,
      items: {},
      pagination: [],

      // INDEX
      filters: DOG.index.defaultFilters,
      sorts: DOG.index.defaultSorts,
      offset: 0,
      limit: DOG.index.defaultLimit,
      // filterForm ???
      // filterFormErrors ???

      // CRUD
      id: undefined,
      addForm: {},
      addFormErrors: {},
      editForm: {},
      editFormErrors: {},

      // FACETS
      havePendingRequests: monkey([
        ["ajaxQueue"],
        function (queue) {
          return ajaxQueueContains(queue, dogApi.indexUrl)
        }
      ]),

      fullLoad: monkey([
        ["dogs", "total"],
        ["dogs", "pagination"],
        function (total, pagination) {
          let loaded = filter(id => id, pagination).length
          if (loaded < total) {
            return false
          } else if (loaded == total) {
            return true
          } else {
            throw Error(`invalid total ${total}`)
          }
        }
      ]),

      currentItem: monkey([
        ["dogs", "items"],
        ["dogs", "id"],
        function (items, id) {
          if (id) {
            return items[id]
          } else {
            return undefined
          }
        }
      ]),

      currentItems: monkey([
        ["dogs", "filters"],
        ["dogs", "sorts"],
        ["dogs", "offset"],
        ["dogs", "limit"],
        ["dogs", "items"],
        ["dogs", "pagination"],
        ["dogs", "fullLoad"],
        function (filters, sorts, offset, limit, items, pagination, fullLoad) {
          let itemsArray = map(id => id && items[id], pagination)
          return pipe(
            fullLoad ? filterByAll(filters) : identity,
            fullLoad ? sortByAll(sorts) : identity,
            slice(offset, offset + limit),
            filter(m => m)
          )(itemsArray)
        }
      ]),
    },

    urlQuery: monkey([
      ["url", "query"],
      function (query) {
        let {filters, sorts, offset, limit} = parseQuery(query)
        return {filters, sorts, offset, limit}
      }
    ]),
  },
  { // OPTIONS
    immutable: process.env.NODE_ENV != "production",
  }
)

function ajaxQueueContains(queue, url) {
  return Boolean(filter(pendindRequest => pendindRequest.url.startsWith(url), queue).length)
}

export default window._state
