import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import TodoAppTasks from './TodoAppTasks'
import TodoAppTaskItems from './TodoAppTaskItems'

class TodoApp extends Component {
  render () {
    return (
      <div>
        <div className='header'>
          <h1 className='title'>ToDo App: React.js, MongoDB & ExpressJs</h1>
        </div>
        <Router>
          <Switch>
            <Route path='/' exact>
              <TodoAppTasks />
            </Route>
            <Route path='/tasks/:listId' exact>
              <TodoAppTaskItems />
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
