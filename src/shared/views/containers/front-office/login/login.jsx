import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router'

if (process.env.BROWSER) {
  require("./login.scss")
}


class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: 'World'
    }
  }

  static fetchData(dispatch, params = {}, query = {}) {
    console.log(dispatch, params)
  }

  componentDidMount() {
    Home.fetchData(this.props.dispatch, this.props.params, this.props.location.query)
  }
  
  render() {
    return (
      <div className="test2" onClick={() => this.setState({name : 'John'})}>
        <h1>Login</h1>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

function stateToProps(state) {
  return {}
}

export default connect(stateToProps)(Home)