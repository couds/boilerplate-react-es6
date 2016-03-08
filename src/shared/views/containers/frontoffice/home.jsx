import React, {Component} from 'react'

if(process.browser){
  require("./home.scss")
}


export default class Home extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      name: 'World'
    }
  }
  
  render() {
    return (
      <div className="test" onClick={() => this.setState({name : 'John'})}>
        Hello {this.state.name}!!
      </div>
    )
  }
}