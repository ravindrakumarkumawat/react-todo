import React, { Component } from 'react'
import TodoAppTasks from './TodoAppTasks'

class TodoApp extends Component {
  render () {
    return (
      <div>
        <div className='header'>
          <h1 className='title'>ToDo App: React.js, MongoDB & ExpressJs</h1>
        </div>
        <TodoAppTasks />
      </div>
    )
  }
}

export default TodoApp
