import React from 'react'
import Layout from './layout'
import Hello from './partials/Hello'

export default class Index extends React.Component {
  render () {
    return (
      <Layout title={this.props.title} name="Title prop from the Layout">
        <div id="react-app"></div>
      </Layout>
    )
  }
}