import React from "react"
import DocumentTitle from "react-document-title"
import {Component, TextHolder} from "frontend/components/common"

export default class Credits extends Component {
  render() {
    return (
      <DocumentTitle title="React Ultimate :: Book">
        <TextHolder>
          <section className="container page home">
            <h1>Credits</h1>

            <h3>Idea</h3>
            <ul>
              <li>Ed, Edd n' Eddy, inspired by <a href="https://github.com/Paqmind/react-ultimate">react-ultimate</a> <em></em></li>
            </ul>

            <h3>Design &amp; Programming</h3>
            <ul>
              <li>Ed, Edd n' Eddy</li>
            </ul>

            <h3>Assets</h3>
            <ul>
              <li>Pictures of <em>dogs</em> by Animals in need foundation from <a href="http://www.ainf.gi/index.php">ainf.gi</a></li>
            </ul>
          </section>
        </TextHolder>
      </DocumentTitle>
    )
  }
}
