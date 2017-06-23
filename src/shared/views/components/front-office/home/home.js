import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator, actionCreator2 } from 'flux/actions/creators';
import pagePropTypes from 'utils/prop-types/page';
import { Link } from 'react-router';

if (process.env.BROWSER) {
  require('./home.scss');
}

class Home extends Component {
  static fetchData(params = {}, query = {}) {
    return [actionCreator(query), actionCreator2()];
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
      <div>
        <Link to="/login">Login</Link>
        <div
          style={{ marginLeft: 10, marginTop: 250, width: 400, height: 400, background: 'blue' }}
        />
        <div draggable="true" style={{ width: 50, height: 50, background: 'red' }} onDragStart={this.onDrag} />

      </div>
    );
  }
}

function stateToProps() {
  return {};
}

export default connect(stateToProps)(Home);
