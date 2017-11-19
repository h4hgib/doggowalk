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

				let gender = (item.gender.charAt(0).toUpperCase() + item.gender.slice(1));
				let getsAlongImgs = [{
					src: 'http://www.ainf.gi/images/dogs/53/cover.jpg',
					link: 'http://www.ainf.gi/doggy.php?id=53'
				},{
					src: 'http://www.ainf.gi/images/dogs/58/cover.jpg',
					link: 'http://www.ainf.gi/doggy.php?id=58'
				},{
					src: 'http://www.ainf.gi/images/dogs/85/cover.jpg',
					link: 'http://www.ainf.gi/doggy.php?id=85'
				},{
					src: 'http://www.ainf.gi/images/dogs/137/cover.jpg',
					link: 'http://www.ainf.gi/doggy.php?id=137'
				},{
					src: 'http://www.ainf.gi/images/dogs/155/cover.jpg',
					link: 'http://www.ainf.gi/doggy.php?id=155'
				},{
					src: 'http://www.ainf.gi/images/dogs/100/cover.jpg',
					link: 'http://www.ainf.gi/doggy.php?id=100'
				},{
					src: 'http://www.ainf.gi/images/dogs/87/cover.jpg',
					link: 'http://www.ainf.gi/doggy.php?id=87'
				},{
					src: 'http://www.ainf.gi/images/dogs/74/cover.jpg',
					link: 'http://www.ainf.gi/doggy.php?id=74'
				},{
					src: 'http://www.ainf.gi/images/dogs/65/cover.jpg',
					link: 'http://www.ainf.gi/doggy.php?id=65'
				}]

				for (var i = 0; i < getsAlongImgs.length; i++) {
					if (getsAlongImgs[i].src == item.image) {
						getsAlongImgs.splice(i, 1);
						break;
					}
				}

				getsAlongImgs.sort( function() { return 0.5 - Math.random() } );
				getsAlongImgs = getsAlongImgs.slice(0, 4)

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
                    <dd className='secondTitle'>{item.name}</dd>
                    <dt>Gender</dt>
                    <dd className='secondTitle'>{gender}</dd>
                    <dt>Age</dt>
                    <dd className='secondTitle'>{age} years old</dd>
                    <dt>Strength</dt>
                    <dd className='secondTitle'>{item.strength}</dd>
                    <dt>Size</dt>
                    <dd className='secondTitle'>{item.size}</dd>
                    <dt>Social Level</dt>
                    <dd className='secondTitle'>{item.social_level}</dd>
                    <dt>Activity Level</dt>
                    <dd className='secondTitle'>{item.activity_level}</dd>
                    <dt>More info</dt>
                    <dd><li><a href={item.description}>{item.description}</a></li></dd>
                    <dt>Gets Along With:</dt>
                    <dd>
                    {getsAlongImgs.map(obj =>
                      <a href={obj.link}><img className='getsAlongImg' src={obj.src}/></a>
                    )}
                    </dd>
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
