// INDEX
import establishIndex from "frontend/actions/establish-index/dog"
import loadIndex from "frontend/actions/load-index/dog"
import fetchIndex from "frontend/actions/fetch-index/dog"

// CRUD
import establishItem from "frontend/actions/establish-item/dog"
import loadItem from "frontend/actions/load-item/dog"
import fetchItem from "frontend/actions/fetch-item/dog"
import addItem from "frontend/actions/add-item/dog"
import editItem from "frontend/actions/edit-item/dog"
import removeItem from "frontend/actions/remove-item/dog"
import {updateAddForm, validateAddForm, resetAddForm} from "frontend/actions/form/dog"
import {updateEditForm, validateEditForm, resetEditForm} from "frontend/actions/form/dog"

// TODO: syntax can be simplified with re-exports (wait for proper IDE support)
export {
  // INDEX
  establishIndex, loadIndex, fetchIndex,

  // CRUD
  establishItem, loadItem, fetchItem, addItem, editItem, removeItem,
  updateAddForm, validateAddForm, resetAddForm,
  updateEditForm, validateEditForm, resetEditForm,
}
