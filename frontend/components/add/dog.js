import {clone, map} from "ramda"
import Class from "classnames"
import {branch} from "baobab-react/decorators"
import React from "react"
import {Link} from "react-router"
import DocumentTitle from "react-document-title"
import api from "common/api/dog"
import {debounce, hasValues} from "common/helpers/common"
import {formatQuery} from "common/helpers/jsonapi"
import {formatTyped} from "common/formatters"
import {Dog} from "common/types"
import {statics} from "frontend/helpers/react"
import * as actions from "frontend/actions/dog"
import * as alertActions from "frontend/actions/alert"
import {ShallowComponent, DeepComponent, ItemLink, NotFound} from "frontend/components/common"
import state from "frontend/state"

let dataCursor = state.select(api.plural)

let validateFormDebounced = debounce(key => {
  actions.validateAddForm(key).catch(err => null)
}, 500)

@statics({
  loadData: actions.loadIndex,
})
@branch({
  cursors: {
    form: [api.plural, "addForm"],
    errors: [api.plural, "addFormErrors"],
  }
})
export default class DogAdd extends DeepComponent {
  handleBlur(key) {
    actions.validateAddForm(key).catch(err => null)
  }

  handleChange(key, data) {
    actions.updateAddForm(key, data)
    validateFormDebounced(key)
  }

  handleSubmit() {
    actions
      .validateAddForm("")
      .then(actions.addItem)
      .then(item => {
        alertActions.addItem({
          message: "Dog added with id: " + item._id,
          category: "success",
        })
      })
      .catch(error => {
        alertActions.addItem({
          message: "Failed to add Dog: " + error,
          category: "error",
        })
      })
  }

  render() {
    let {form, errors} = this.props

    return (
      <DocumentTitle title={"Add Dog"}>
        <div>
          <Actions {...this.props}/>
          <section className="container margin-top-lg">
            <div className="row">
              <div className="col-xs-12 col-sm-9">
                <h1 className="nomargin-top">Add Dog</h1>
                <fieldset>
                  <div className={Class("form-group", {
                    required: false,
                    error: Boolean(errors.name),
                  })}>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                      value={form.name}
                      onBlur={() => this.handleBlur("name")}
                      onChange={event => this.handleChange("name", event.currentTarget.value)}
                      id="name" className="form-control"/>
                    <div className={Class("help", {
                      error: Boolean(errors.name),
                    })}>
                      {map(message => <span key="">{message}</span>, [errors.name])}
                    </div>
                  </div>

                  <div className={Class("form-group", {
                    required: false,
                    error: Boolean(errors.manufacturer),
                  })}>
                    <label htmlFor="image">Image Link</label>
                    <input type="text"
                      value={form.image}
                      onBlur={() => this.handleBlur("image")}
                      onChange={event => this.handleChange("image", event.currentTarget.value)}
                      id="image" className="form-control"/>
                    <div className={Class("help", {
                      error: Boolean(errors.manufacturer),
                    })}>
                      {map(message => <span key="">{message}</span>, [errors.image])}
                    </div>
                  </div>

                  <div className={Class("form-group", {
                    required: false,
                    error: Boolean(errors.assemblyDate),
                  })}>
                    <label htmlFor="description">Description Link</label>
                    <input type="text"
                      value={form.description}
                      onBlur={() => this.handleBlur("description")}
                      onChange={event => this.handleChange("description", event.currentTarget.value)}
                      id="description" className="form-control"/>
                    <div className={Class("help", {
                      error: Boolean(errors.description),
                    })}>
                      {map(message => <span key="">{message}</span>, [errors.description])}
                    </div>
                  </div>

                  <div className={Class("form-group", {
                      required: false,
                      error: Boolean(errors.gender),
                  })}>
                    <label htmlFor="gender">Gender</label>
                    <input type="text"
                           value={form.gender}
                           onBlur={() => this.handleBlur("gender")}
                           onChange={event => this.handleChange("gender", event.currentTarget.value)}
                           id="gender" className="form-control"/>
                    <div className={Class("help", {
                        error: Boolean(errors.gender),
                    })}>
                        {map(message => <span key="">{message}</span>, [errors.gender])}
                    </div>
                  </div>

                  <div className={Class("form-group", {
                      required: false,
                      error: Boolean(errors.activity_level),
                  })}>
                    <label htmlFor="activity_level">Activity Level</label>
                    <input type="text"
                           value={form.activity_level}
                           onBlur={() => this.handleBlur("activity_level")}
                           onChange={event => this.handleChange("activity_level", event.currentTarget.value)}
                           id="activity_level" className="form-control"/>
                    <div className={Class("help", {
                        error: Boolean(errors.activity_level),
                    })}>
                        {map(message => <span key="">{message}</span>, [errors.activity_level])}
                    </div>
                  </div>

                  <div className={Class("form-group", {
                      required: false,
                      error: Boolean(errors.social_level),
                  })}>
                    <label htmlFor="social_level">Social Level</label>
                    <input type="text"
                           value={form.social_level}
                           onBlur={() => this.handleBlur("social_level")}
                           onChange={event => this.handleChange("social_level", event.currentTarget.value)}
                           id="social_level" className="form-control"/>
                    <div className={Class("help", {
                        error: Boolean(errors.social_level),
                    })}>
                        {map(message => <span key="">{message}</span>, [errors.social_level])}
                    </div>
                  </div>

                  <div className={Class("form-group", {
                      required: false,
                      error: Boolean(errors.size),
                  })}>
                    <label htmlFor="size">Size</label>
                    <input type="text"
                           value={form.size}
                           onBlur={() => this.handleBlur("size")}
                           onChange={event => this.handleChange("size", event.currentTarget.value)}
                           id="size" className="form-control"/>
                    <div className={Class("help", {
                        error: Boolean(errors.size),
                    })}>
                        {map(message => <span key="">{message}</span>, [errors.size])}
                    </div>
                  </div>

                  <div className={Class("form-group", {
                      required: false,
                      error: Boolean(errors.strenght),
                  })}>
                    <label htmlFor="strenght">Strenght</label>
                    <input type="text"
                           value={form.strenght}
                           onBlur={() => this.handleBlur("strenght")}
                           onChange={event => this.handleChange("strenght", event.currentTarget.value)}
                           id="strenght" className="form-control"/>
                    <div className={Class("help", {
                        error: Boolean(errors.strenght),
                    })}>
                        {map(message => <span key="">{message}</span>, [errors.strenght])}
                    </div>
                  </div>

                </fieldset>
                <div className="btn-group">
                  <button className="btn btn-default" type="button" onClick={() => this.handleReset()}>Reset</button>
                  <button className="btn btn-primary" type="button" onClick={() => this.handleSubmit()} disabled={hasValues(errors)}>Submit</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </DocumentTitle>
    )
  }
}

class Actions extends ShallowComponent {
  render() {
    let query = formatQuery({
      filters: dataCursor.get("filters"),
      sorts: dataCursor.get("sorts"),
      offset: dataCursor.get("offset"),
      limit: dataCursor.get("limit")
    })

    return (
      <div className="actions">
        <div className="container">
          <div className="btn-group btn-group-sm pull-left">
            <Link to="dog-index" query={query} className="btn btn-gray-light" title="Back to list">
              <span className="fa fa-arrow-left"></span>
              <span className="hidden-xs margin-left-sm">Back to list</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
