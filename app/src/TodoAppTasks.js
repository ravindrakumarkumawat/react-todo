import React, { Component } from 'react'

function TodoInput () {
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

function Lists () {
  return (
    <li>
      <span>Ravindra</span>
      <Button />
    </li>
  )
}

function Button () {
  return (
    <span>
      <button className='btn-delete'>Delete</button>
      <button className='btn-edit'>Edit</button>
      <button className='btn-edit'>Save</button>
    </span>
  )
}

class TodoAppTasks extends Component {
  render () {
    return (
      <div className='todo-lists'>
        <h2>My Lists </h2>
        <TodoInput />
        <ul>
          <Lists />
        </ul>
        <p className='empty-list'>
          Pheww, List is Empty. Lets Chill & Netflix 🍕🍔🍺
        </p>
      </div>
    )
  }
}

export default TodoAppTasks
