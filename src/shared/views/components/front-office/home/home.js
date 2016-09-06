import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'flux';


if (process.env.BROWSER) {
  require('./home.scss');
}

class Home extends Component {
  static getActions(params = {}, query = {}) {
    const actions = new Actions();
    return [actions.Home.fetchHomeData()];
  }
  componentDidMount() {
    Home.getActions(this.props.params, this.props.location.query).map(this.props.dispatch);
  }


  render() {
    return (
      <div>
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    home: state.get('home'),
  };
}

export default connect(stateToProps)(Home);
