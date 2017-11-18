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
            selectedDogs: [],
            experts: false,
            date: "",
            time: "",
            stageShown: 1
        };

        this.name = "";
        this.people = "";
        this.date = "";
        this.time = "";
        this.expert = false;
        this.selectedDogs = [];

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

        if (this.state.stageShown === 1 && this.name !== "" && this.people >= 1) {
            this.setState({
                people: this.people,
                name: this.name,
                expert: this.expert,
                stageShown:2
            });
        }
        else if (this.state.stageShown === 2 && this.date !== "" && this.time !== "") {
            this.setState({
                date: this.date,
                time: this.time,
                stageShown:3
            });
        } else if (this.state.stageShown === 3 && this.selectedDogs.length > 0) {
            this.setState({
                selectedDogs: this.selectedDogs,
                stageShown:4
            });
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

    handleClickedDog(dogId) {
        this.selectedDogs.push(dogId);
        console.log(dogId);
    }

    render() {

        const today = new Date();
        const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
        let {filters, sorts, offset, limit, total, items} = this.props

        let elements = null;
        switch (this.state.stageShown) {
            case 1:
                elements = (
                    <div>
                        <h2>Add your info</h2>
                        <p>Name:</p>
                        <input type="text"
                               onChange={event => this.handleChange("name", event)}
                               id="name" className="form-control"/>
                        <p>How many people?</p>
                        <input type="number"
                               onChange={event => this.handleChange("people", event)}
                               id="people" className="form-control"/>
                        <p>Are you an expert?</p>
                        <input type="checkbox" id="expertbox" onClick={this.handleClick}/>
                    </div>
                );
                break;
            case 2:
                elements = (
                    <div>
                        <h3>Pick a date</h3>
                        <InfiniteCalendar
                            width={400}
                            height={200}
                            selected={today}
                            disabledDays={[0,6]}
                            minDate={lastWeek}
                            onSelect={event => this.handleChange("date", event)}
                        />
                        <h3>Pick a time</h3>
                        <TimeInput
                            initTime='00:00'
                            className='form-control'
                            mountFocus='true'
                            onTimeChange={event => this.handleChange("time", event)}
                        />
                    </div>
                );
                break;

            case 3:
                elements = (
                    <div className="row selectDog">
                        {map(item => <SelectionDogItem item={item} key={item._id} onSelect={this.handleClickedDog}/>, items)}
                    </div>
                );
                break;


            case 4:
                elements = (
                    <div className="row">
                        <h3>Your walk has been registered</h3>
                        <h4>{`${this.state.date.toString()}`}</h4>
                        <h4>{this.state.time}</h4>
                    </div>
                );
                break;

        }

        return (
          <DocumentTitle title="React Ultimate :: Book">
            <TextHolder>
              <section className="container page home">
                <h1>Book the Activity</h1>
                  {elements}
                  {(this.state.stageShown > 1 && this.state.stageShown < 4)&&
                     <button className="btn btn-default" type="button" onClick={this.handlePrev}>Previous</button>
                  }
                  {this.state.stageShown < 3 &&
                     <button className="btn btn-default" type="button" onClick={this.handleNext}>Next</button>
                  }
                  {this.state.stageShown === 3 &&
                     <button className="btn btn-default" type="button" onClick={this.handleNext}>Confirm</button>
                  }
              </section>
            </TextHolder>
          </DocumentTitle>
        )
  }
}
