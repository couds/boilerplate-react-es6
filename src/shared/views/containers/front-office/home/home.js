import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreator } from 'flux/actions/creators';


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

  onOver = (evt) => {
    console.log('Over', `(${evt.clientX},${evt.clientY})`, evt.detail);
  }

  onDrag = (evt) => {
    console.log('Drag');
  }

  onClick = evt => {
    this.props.dispatch(actionCreator()).then(t => {
      console.log('after dispatch', t);
    });
  }

  render() {
    return (
      <div>
        <div onClick={this.onClick} onDragOver={this.onOver} style={{ marginLeft: 100, marginTop: 250, width: 400, height: 400, background: 'blue' }} >

        </div>
        <div draggable="true" style={{ width: 50, height: 50, background: 'red' }} onDragStart={this.onDrag} >

        </div>

      </div>
    );
  }
}

function stateToProps(state) {
  return {};
}

export default connect(stateToProps)(Home);
