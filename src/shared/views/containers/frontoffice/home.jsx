import React, {Component} from 'react'


export default class Home extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      name : 'World'
    }
  }
  
  render() {
    return (
      <div onClick={() => this.setState({name : 'John'})}>
        Hello {this.state.name}!!
      </div>
    )
  }
}