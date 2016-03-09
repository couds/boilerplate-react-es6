import React, {Component} from 'react'
import {connect} from 'react-redux'

class MainLayout extends Component {
  
  constructor(props) {
    super(props)

  }
  
  render() {
    return (
      <html>
      <head>
        <script id="initial-state" type="text/json"
                dangerouslySetInnerHTML={{__html:JSON.stringify(this.props.data)}}>
        </script>

        <title>Test</title>
        <script async src="/static/javascripts/bundle.js"></script>
        <link rel="stylesheet" href="/static/stylesheets/style.css"/>
      </head>
      <body>
      <div id="react-app" dangerouslySetInnerHTML={{__html : this.props.children}}/>
      </body>
      </html>
    )
  }
}

function storeToProps(store) {
  return {
    data: store
  }
}

export default connect(storeToProps)(MainLayout)