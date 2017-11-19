import React from "react"
import DocumentTitle from "react-document-title"
import {Component, TextHolder} from "frontend/components/common"

export default class About extends Component {
  render() {
    return (
      <DocumentTitle title="React Ultimate :: tetet">
        <TextHolder>
          <section className="container page home center-about">
            <h1>About</h1>

            {/*<h3>Join Us</h3>*/}
            <p>
              Have you ever though of volunteering as a dogwalker?
              It's a fantastic way to get some fresh air, for both human and pooch and check out all the benefits:
            </p>

            <h3>Increases Chance Of Adoption</h3>
            <p>
              Each and every walk for these lovely doggies really does increase their chances of adoption.
              Why? Theres a few reasons. One is that by taking photos and videos of your dog on each walk,
              and then posting on social media, you are really increasing their exposure and getting their
              story out there. In turn we get more adoption enquiries. Dogwalking on its own has very often
              resulted in adoption!
            </p>

            <h3>Improves Dogs Health & Happiness</h3>
            <p>
              Although the doggies are well taken care of, there is no substitute for a lovely beach walk
              and the fresh salty air. It does wonders for the dogs socialisation with other dogs and humans
              alike, and also really makes them happier. All of this means they are more likely to have a
              successful adoption.
            </p>

            <h3>A Fun Experience</h3>
            <p>
              The more important stuff aside, it's a whole load of fun! It gives you a chance not only to make
              a massive difference to these needy furbabies, but also lets you meet other likeminded people in
              a lovely setting, and gives you a little exercise too! Some great friendships have formed on our
              dogwalks.
            </p>



            <h1>Want To Join?</h1>
            <p>
              If you'd like to join us on a dogwalk, thats great! The more the merrier and we would love for you
              to join us, the doggies will love to meet you too!
              <a href='/dogs/'> Please sign up here</a>
            </p>
          </section>
        </TextHolder>
      </DocumentTitle>
    )
  }
}
