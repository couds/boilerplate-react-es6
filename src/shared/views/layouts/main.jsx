import React, { Component } from 'react';
import { connect } from 'react-redux';

class MainLayout extends Component {
  render() {
    return (
      <html lang="en">
        <head>
          <script id="initial-state"
            type="text/json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(this.props.data) }} />
          <title>Test</title>
          <script async src="/static/javascripts/bundle.js" />
          <link rel="stylesheet" href="/static/stylesheets/style.css" />
        </head>
        <body>
          {
            // eslint-disable-next-line
           <div id="react-app" dangerouslySetInnerHTML={{ __html: this.props.children }} />
          }
        </body>
      </html>
    );
  }
}

function storeToProps(store) {
  return {
    data: store,
  };
}

export default connect(storeToProps)(MainLayout);
