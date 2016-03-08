import React, {Component} from 'react'


export default class MainLayout extends Component {
  
  constructor(props) {
    super(props)

  }
  
  render() {
    return (
      <html>
        <head>
          <title>Test</title>
          <script src="/static/javascripts/bundle.js"></script>
        </head>
        <body>
          <div id="react-app" dangerouslySetInnerHTML={{__html : this.props.children}}/>
        </body>
      </html>
    )
  }
}
