import React from "react"
import {Link} from "react-router"
import * as actions from "frontend/actions/dog"
import {ShallowComponent} from "frontend/components/common"

export default class DogItem extends ShallowComponent {
  static propTypes = {
    item: React.PropTypes.object,
  }

  render() {
    let item = this.props.item

  var sadorhappy;
  if (1<0) {
    sadorhappy =  <img src="../public/sad_doggo.png" height="33" width="38" title="Not walked"></img>;
  } else {
    sadorhappy =  <img src="../public/happy_doggo.png" height="33" width="38" title="Recently walked"></img>;
  }

    if (item) {
      return (
        <div key={item._id} className="col-sm-6 col-md-3">
          <div className="panel panel-default" key={item._id}>
            <div className="panel-heading">
              <h4 className="panel-title"><Link to="dog-detail" params={{id: item._id}}>{item.name}</Link></h4>
            </div>
            <div className="panel-body text-center nopadding">
              <Link to="dog-detail" params={{id: item._id}}>
                <img src={'http://robohash.org/' + item._id + '?size=200x200'} width="200px" height="200px"/>
              </Link>
            </div>
            <div className="panel-footer">
              <div className="clearfix">
                 {sadorhappy}
                <div className="btn-group btn-group-sm pull-right">
                  <Link to="dog-detail" params={{id: item._id}} className="btn btn-blue" title="Detail">
                    <span className="fa fa-eye"></span>
                  </Link>
                  <Link to="dog-edit" params={{id: item._id}} className="btn btn-orange" title="Edit">
                    <span className="fa fa-edit"></span>
                  </Link>
                  <a className="btn btn-red" title="Remove" onClick={() => actions.removeItem(item._id)}>
                    <span className="fa fa-times"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}
