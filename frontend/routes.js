import React from "react"

// Eager Components
import {Route, DefaultRoute, NotFoundRoute} from "react-router"
import Body from "frontend/components/body"
import {About, Book, Credits} from "frontend/components/page"
import {NotFound} from "frontend/components/common"

//Lazy Components
//import {DogIndex, DogAdd, DogDetail, DogEdit} from "react-proxy!frontend/components/dog"
//Not compatible. Check for React-Router to allow metadata passing!
import {DogIndex, DogAdd, DogDetail, DogEdit} from "frontend/components/dog"

export default (
  <Route path="/" handler={Body}>
    <DefaultRoute name="about" handler={About}/>
    <Route path="/book" name="book" handler={Book}/>
    <Route path="/credits" name="credits" handler={Credits}/>
    <NotFoundRoute handler={NotFound}/>

    <Route path="/dogs/" name="dog-index" handler={DogIndex}/>
    <Route path="/dogs/add" name="dog-add" handler={DogAdd}/>
    <Route path="/dogs/:id" name="dog-detail" handler={DogDetail}/>
    <Route path="/dogs/:id/edit" name="dog-edit" handler={DogEdit}/>
  </Route>
)
