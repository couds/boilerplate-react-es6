import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';
import pagePropTypes from 'utils/prop-types/page';

if (process.env.BROWSER) {
  require('./login.scss');
}


class Home extends Component {
  static fetchData(params = {}, query = {}) {
    return [{ type: 'TEST', payload: { params, query } }];
  }

  static propTypes = {
    ...pagePropTypes,
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
      <div role="button" tabIndex="-1" className="test2" onClick={() => this.setState({ name: 'John' })}>
        <h1>Login</h1>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

function stateToProps(state) {
  return { ...state };
}

export default connect(stateToProps)(Home);
