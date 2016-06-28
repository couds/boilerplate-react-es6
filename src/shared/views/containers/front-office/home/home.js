import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

if (process.env.BROWSER) {
  require('./home.scss');
}

let aux = 1;

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
    const x = aux;
    aux = 0;
    this.props.dispatch({
      type: 'TEST',
      payload: () => new Promise((resolve) => {
        console.log('Start payload promise');
        setTimeout(() => {
          if (x) {
            console.log('CORRECT EVENT RESOLVE PAYLOAD');
          }
          console.log('Finish promise Test Results');
          resolve('TEST Result');
        }, 3000);
      }),
    }).then(t => {
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
