import React, { Component } from 'react'
import TodoAppTasks from './TodoAppTasks'
import TodoAppTaskItems from './TodoAppTaskItems'
import TodoAppTaskItemPriority from './TodoAppTaskItemPriority'

class TodoApp extends Component {
  render () {
    return (
      <div>
        <div className='header'>
          <h1 className='title'>ToDo App: React.js, MongoDB & ExpressJs</h1>
        </div>
        <TodoAppTasks />
        <TodoAppTaskItems />
        <TodoAppTaskItemPriority />
      </div>
    )
  }
}

export default TodoApp
