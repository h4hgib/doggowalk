import React from "react"
import DocumentTitle from "react-document-title"
import {Component, TextHolder} from "frontend/components/common"
import InfiniteCalendar from 'react-infinite-calendar';
import TimeInput from 'react-time-input';

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

        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
    }

    handleChange(key, evt) {

        let value = evt;
        if (key !== "date" && key !== "time") {
            value = value.target.value;
        }
        this[key] = value;
    }

    handleNext() {

        if (this.state.stageShown === 1 && this.name !== "" && this.people >= 1) {
            this.setState({
                people: this.people,
                name: this.name,
                stageShown:2
            });
        }
        else if (this.state.stageShown === 2 && this.date !== "" && this.time !== "") {
            this.setState({
                date: this.date,
                time: this.time,
                stageShown:3
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

    render() {

        const today = new Date();
        const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

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
                break
        }

        return (
          <DocumentTitle title="React Ultimate :: Book">
            <TextHolder>
              <section className="container page home">
                <h1>Book the Activity</h1>
                  {elements}
                  {this.state.stageShown > 1 &&
                     <button className="btn btn-default" type="button" onClick={this.handlePrev}>Previous</button>
                  }
                  {this.state.stageShown < 3 &&
                     <button className="btn btn-default" type="button" onClick={this.handleNext}>Next</button>
                  }
              </section>
            </TextHolder>
          </DocumentTitle>
        )
  }
}
