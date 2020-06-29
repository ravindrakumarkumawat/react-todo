import React, { Component } from 'react'

class TodoInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render () {
    return (
      <div>
        <input
          className='new-todo-input'
          placeholder='Search | Create a List'
        />
        <button className='btn'>
              +
        </button>
      </div>
    )
  }
}

function Lists () {
  return (
    <ul>
      <li>
        <span>Ravindra</span>
        <button className='btn-delete'>Delete</button>
        <button className='btn-edit'>Edit</button>
        <button className='btn-edit'>Save</button>
      </li>
    </ul>
  )
}

class TodoAppTasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: []
    }
  }  

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  render () {
    return (
      <div className='todo-lists'>
        <h2>My Lists </h2>
        <TodoInput />
        <Lists />
        <p className='empty-list'>
          Pheww, List is Empty. Lets Chill & Netflix 🍕🍔🍺
        </p>
      </div>
    )
  }
}

export default TodoAppTasks
