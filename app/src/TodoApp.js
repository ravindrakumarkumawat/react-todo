import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
        <Router>
          <Switch>
            <Route path='/lists' exact>
              <TodoAppTasks />
            </Route>
            <Route path='/list/:id/tasks' exact>
              <TodoAppTaskItems />
            </Route>
            <Route path='/list/:id/task/:tid' exact>
              <TodoAppTaskItemPriority />
            </Route>
            <Route path='*'>
              <TodoAppTasks />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default TodoApp
