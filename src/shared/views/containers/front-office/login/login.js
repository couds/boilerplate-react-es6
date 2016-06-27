import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

if (process.env.BROWSER) {
  require('./login.scss');
}


class Home extends Component {
  static fetchData(params = {}, query = {}) {
    return [Promise.resolve({ type: 'TEST' })];
  }

  constructor(props) {
    super(props);
    this.state = {
      name: 'World',
    };
  }

  componentDidMount() {
    Home.fetchData(this.props.params, this.props.location.query);
  }

  render() {
    return (
      <div className="test2" onClick={() => this.setState({ name: 'John' })}>
        <h1>Login</h1>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

function stateToProps(state) {
  return {};
}

export default connect(stateToProps)(Home);
