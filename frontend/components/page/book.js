import React from "react"
import DocumentTitle from "react-document-title"
import {Component, TextHolder} from "frontend/components/common"
import InfiniteCalendar from 'react-infinite-calendar';
import TimeInput from 'react-time-input';
import SelectionDogItem from "frontend/components/item/selectableDog"

import {map} from "ramda"
import {statics} from "frontend/helpers/react"
import {branch} from "baobab-react/decorators"
import api from "common/api/dog"
import * as actions from "frontend/actions/dog"

@statics({
    loadData: actions.establishIndex,
})
@branch({
    cursors: {
        filters: [api.plural, "filters"],
        sorts: [api.plural, "sorts"],
        offset: [api.plural, "offset"],
        limit: [api.plural, "limit"],
        total: [api.plural, "total"],
        items: [api.plural, "currentItems"],
    }
})

export default class Book extends Component {

    constructor(props) {

        super(props);

        this.state = {
            name: "",
            people: 1,
            email: "",
            phone: "",
            selectedDogs: {},
            expert: false,
            date: "",
            time: "",
            stageShown: 1,
            showNotification: false
        };

        this.name = "";
        this.people = "";
        this.phone = "";
        this.email = "";
        this.date = "";
        this.time = "";
        this.expert = false;
        this.selectedDogs = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickedDog = this.handleClickedDog.bind(this);
    }

    handleChange(key, evt) {

        let value = evt;
        if (key !== "date" && key !== "time") {
            value = value.target.value;
        }
        this[key] = value;
    }

    handleClick() {
        this.expert = !this.expert;
    }

    handleNext() {

        if (this.state.stageShown === 1 && this.name !== "" && this.phone !== "" && this.email !== "" && this.people >= 1) {
            this.setState({
                people: this.people,
                name: this.name,
                email: this.email,
                phone: this.phone,
                expert: this.expert,
                showNotification: false,
                stageShown:2
            });
        }
        else if (this.state.stageShown === 2 && this.date !== "" && this.time !== "") {
            this.setState({
                date: this.date,
                time: this.time,
                showNotification: false,
                stageShown:3
            });
        } else if (this.state.stageShown === 3) {
            if (Object.keys(this.selectedDogs).length > 0 && Object.keys(this.selectedDogs).length <= this.state.people) {
                this.setState({
                    selectedDogs: this.selectedDogs,
                    showNotification: false,
                    stageShown: 4
                });
            } else {
                this.setState({
                    showNotification: true
                });
            }
        }
    }

    handlePrev() {

        if (this.state.stageShown === 2) {
            this.setState({
                stageShown:1
            });
        }
        else if (this.state.stageShown === 3) {
            this.setState({
                stageShown:2
            });
        }
    }

    handleClickedDog(item) {
        if(this.selectedDogs.hasOwnProperty(item.id)) {
            delete this.selectedDogs[item.id];
        } else {
            this.selectedDogs[item.id] = item;
        }
    }

    render() {

        const today = new Date();
        const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        let {filters, sorts, offset, limit, total, items} = this.props

        let elements = null;
        switch (this.state.stageShown) {
            case 1:

                setTimeout(() => {
                    window.scrollTo(0, 0)
                }, 100);

                elements = (
                    <div>
                        <h2>Add your info</h2>
                        <p>Name:</p>
                        <input type="text"
                               onChange={event => this.handleChange("name", event)}
                               id="name" className="form-control text-input-data"/>
                        <br/>
                        <p>Phone:</p>
                        <input type="text"
                               onChange={event => this.handleChange("phone", event)}
                               id="phone" className="form-control text-input-data__medium"/>
                        <br/>
                        <p>Email:</p>
                        <input type="text"
                               onChange={event => this.handleChange("email", event)}
                               id="email" className="form-control text-input-data"/>
                        <br/>
                        <p>How many people?</p>
                        <input type="number"
                               onChange={event => this.handleChange("people", event)}
                               id="people" className="form-control text-input-data__small"/>
                        <br/>
                        <span>
                            <label>Are you an expert?</label><input type="checkbox" id="expertbox" onClick={this.handleClick}/>
                        </span>
                    </div>
                );
                break;
            case 2:
                const disabledDays = this.state.expert ? [] : [0,1,2,3,4];

                setTimeout(() => {
                    window.scrollTo(0, 0)
                }, 100);

                elements = (
                    <div>
                        <h3>Pick a date</h3>
                        <InfiniteCalendar
                            width={400}
                            height={200}
                            selected={today}
                            disabledDays={disabledDays}
                            minDate={lastWeek}
                            onSelect={event => this.handleChange("date", event)}
                        />
                        <h3>Pick a time</h3>
                        <TimeInput
                            initTime='00:00'
                            className='form-control text-input-data__medium'
                            mountFocus='true'
                            onTimeChange={event => this.handleChange("time", event)}
                        />
                    </div>
                );
                break;

            case 3:

                setTimeout(() => {
                    window.scrollTo(0, 0)
                }, 100);

                elements = (
                    <div className="row selectDog">
                        {map(item => <SelectionDogItem item={item} key={item._id} onSelect={() => {this.handleClickedDog(item)}}/>, items)}
                    </div>
                );
                break;


            case 4:

                setTimeout(() => {
                    window.scrollTo(0, 0)
                }, 100);

                const dogs = Object.keys(this.state.selectedDogs);
                let dogNames = "";
                const dogImages = [];
                for(let i = 0; i < dogs.length; i++) {
                    dogNames = dogNames + this.state.selectedDogs[dogs[i]].name;
                    dogImages.push(<img src={`${this.state.selectedDogs[dogs[i]].image}`} className="getsAlongImg"/>);
                    if (i + 1 < dogs.length) {
                        dogNames = dogNames + ", ";
                    }
                }

                elements = (
                    <div className="book-success">
                        <h3>{this.state.name} your walk has been registered!!</h3>
                        <br/>
                        <h4>{`${dogNames} are waiting for you`}</h4>
                        <p>{`${this.state.date.toString().split("00:")[0]} at ${this.state.time}`}</p>
                        {dogImages}
                    </div>
                );
                break;
        }

        return (
          <DocumentTitle title="React Ultimate :: Book">
            <TextHolder>
              <section className={`container page home ${this.state.stageShown !== 3 ? "book-page" : ""}`}>
                  {this.state.stageShown < 4 &&
                    <h1>Book the Activity</h1>
                  }
                  {elements}
                  <br/>
                  <div className="button-area">
                      {(this.state.stageShown === 3 && this.state.showNotification) &&
                        <p className="alert-msg">Sorry but you can't walk so many dogs. You have selected {Object.keys(this.selectedDogs).length} and you are allowed to walk {this.state.people}.</p>
                      }
                      {(this.state.stageShown > 1 && this.state.stageShown < 4)&&
                        <button className="btn btn-default step-button" type="button" onClick={this.handlePrev}>Previous</button>
                      }
                      {this.state.stageShown < 3 &&
                         <button className="btn btn-default step-button" type="button" onClick={this.handleNext}>Next</button>
                      }
                      {this.state.stageShown === 3 &&
                        <button className="btn btn-default step-button" type="button" onClick={this.handleNext}>Confirm</button>
                      }
                  </div>

              </section>
            </TextHolder>
          </DocumentTitle>
        )
  }
}
