import React from 'react';
import Hello from './partials/Hello'

export default class Layout extends React.Component {
  propTypes:{
    title : React.PropTypes.String.required
    }

  render() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          <header className="mp-nav" role="banner">
            <div className="container row">
              <div className="col-md-6">
                <h1>{this.props.name}</h1>
              </div>
              <Hello title="TEST" />
            </div>
          </header>
          {this.props.children}
          <script src="javascripts/bundle.js"></script>
        </body>
      </html>
    )
  }
}