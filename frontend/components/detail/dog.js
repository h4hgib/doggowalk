import {branch} from "baobab-react/decorators"
import React from "react"
import ReactDOM from "react-dom"
import {Link} from "react-router"
import DocumentTitle from "react-document-title"
import api from "common/api/dog"
import {formatQuery} from "common/helpers/jsonapi"
import {statics} from "frontend/helpers/react"
import state from "frontend/state"
import * as actions from "frontend/actions/dog"
import {ShallowComponent, DeepComponent, ItemLink, NotFound} from "frontend/components/common"

let dataCursor = state.select(api.plural)

@statics({
  loadData: actions.establishItem,
})
@branch({
  cursors: {
    havePendingRequests: [api.plural, "havePendingRequests"],
    item: [api.plural, "currentItem"],
  }
})
export default class DogDetail extends DeepComponent {
  render() {
    let {havePendingRequests, item} = this.props
    

    if (item) {
      return (
        <DocumentTitle title={"Detail " + item.name}>
          <div>
            <Actions {...this.props}/>
            <section className="container margin-top-lg">
              <div className="row">
                <div className="col-xs-12 col-sm-3">
                  <div className="thumbnail">
                    <img src={item.image} width="200px" height="200px"/>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-9">
                  <h1 className="nomargin-top">{item.name}</h1>
                  <dl>
                    <dt>Name</dt>
                    <dd>{item.name}</dd>
                    <dt>Gender</dt>
                    <dd>{item.gender}</dd>
                    <dt>Age</dt>
                    <dd>{item.birth_date}</dd>
                    <dt>Strength</dt>
                    <dd>{item.strength}</dd>
                    <dt>Size</dt>
                    <dd>{item.size}</dd>
                    <dt>Social Level</dt>
                    <dd>{item.social_level}</dd>
                    <dt>Activity Level</dt>
                    <dd>{item.activity_level}</dd>
                    <dt>More info</dt>
                    <dd>{item.description}</dd>
                  </dl>
                </div>
              </div>
            </section>
          </div>
        </DocumentTitle>
      )
    } else if (havePendingRequests) {
      return null
    } else {
      return <NotFound/>
    }
  }
}

class Actions extends ShallowComponent {
  render() {
    let {item} = this.props
    let query = formatQuery({
      filters: dataCursor.get("filters"),
      sorts: dataCursor.get("sorts"),
      offset: dataCursor.get("offset"),
      limit: dataCursor.get("limit"),
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
          <div className="btn-group btn-group-sm pull-right">
            <Link to="dog-add" className="btn btn-sm btn-green" title="Add">
              <span className="fa fa-plus"></span>
            </Link>
            <ItemLink to="dog-edit" params={{id: item.id}} className="btn btn-orange" title="Edit">
              <span className="fa fa-edit"></span>
            </ItemLink>
            <a className="btn btn-red" title="Remove" onClick={() => actions.removeItem(item.id)}>
              <span className="fa fa-times"></span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
