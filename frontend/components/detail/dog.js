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

  constructor(props) {
    super(props);

    this.state = {
      actualRoute: 1,
        date: "11 November 2017"
    };

    this.changeRoute = this.changeRoute.bind(this);
  }

  changeRoute(value) {

    let newVal = 0;

    if (value + this.state.actualRoute > this.state.actualRoute) {
        newVal = this.state.actualRoute < 4 ? this.state.actualRoute + value : 1;
    } else {
        newVal = this.state.actualRoute === 1 ? this.state.actualRoute + value : 5;
    }

    const date = "1" + newVal + " November 2017";

    this.setState({
        actualRoute: newVal,
        date: date
    })
  }

  render() {
    let {havePendingRequests, item} = this.props


    if (item) {
        var today = new Date();
        var birthDate = new Date(item.birth_date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
        {
            age--;
        }
        console.log(age);

				let gender = (item.gender.charAt(0).toUpperCase() + item.gender.slice(1));

      return (
        <DocumentTitle title={"Detail " + item.name}>
          <div>
            <Actions {...this.props}/>
            <section className="container margin-top-lg">
              <div className="row">
                <div className="col-xs-3">
                  <div className="thumbnail">
                    <img src={item.image} width="300px"/>
                  </div>
                </div>
                <div className="col-xs-6">
                  <h1 className="nomargin-top">{item.name}</h1>
                  <dl>
                    <dt>Name</dt>
                    <dd>{item.name}</dd>
                    <dt>Gender</dt>
                    <dd>{gender}</dd>
                    <dt>Age</dt>
                    <dd>{age} years old</dd>
                    <dt>Strength</dt>
                    <dd>{item.strength}</dd>
                    <dt>Size</dt>
                    <dd>{item.size}</dd>
                    <dt>Social Level</dt>
                    <dd>{item.social_level}</dd>
                    <dt>Activity Level</dt>
                    <dd>{item.activity_level}</dd>
                    <dt>More info</dt>
                    <dd><li><a href={item.description}>{item.description}</a></li></dd>
                  </dl>
                </div>
                  <div className="col-xs-3">
                      <h3>Previous walks</h3>
                      <img src={`../public/route${this.state.actualRoute}.png`} width="200px" height="200px"/>
                      <p>{this.state.date}</p>
                      <button className="btn btn-default" type="button" onClick={() => this.changeRoute(-1)}>Prev</button>
                      <button className="btn btn-default" type="button" onClick={() => this.changeRoute(1)}>Next</button>
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
            <ItemLink to="dog-edit" params={{id: item._id}} className="btn btn-orange" title="Edit">
              <span className="fa fa-edit"></span>
            </ItemLink>
            <a className="btn btn-red" title="Remove" onClick={() => actions.removeItem(item._id)}>
              <span className="fa fa-times"></span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
