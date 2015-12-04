import React from 'react'
import ReactDOM from 'react-dom'


export default class Hello extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      title: props.title || 'empty title'
    }
  }

  handleChange(e) {
    this.setState({
      title: 'change title'
    })
  }

  render() {
    return (
      <label htmlFor="test" onClick={this.handleChange}>HELLO {this.state.title}</label>
    )
  }
}