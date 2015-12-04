
import React from 'react'
import ReactDOM from 'react-dom'
import Hello from '../../views/partials/Hello.jsx';

// Snag the initial state that was passed from the server side
let initialState = "World"

// Render the components, picking up where react left off on the server
ReactDOM.render(
  <Hello title={initialState}/>,
  document.getElementById('react-app')
);