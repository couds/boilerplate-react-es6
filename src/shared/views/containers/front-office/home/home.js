import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

if (process.env.BROWSER) {
  require('./home.scss');
}

class Home extends Component {
  static fetchData(params = {}, query = {}) {
    return [Promise.resolve({ type: 'lala' })];
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
      <div className="test" onClick={() => this.setState({ name: 'John' })} >
        Hello {this.state.name}!!
        <Link to="/login" >Login</Link>
      </div>
    );
  }
}

function stateToProps(state) {
  return {};
}

export default connect(stateToProps)(Home);
