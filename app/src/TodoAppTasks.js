import React, { Component } from 'react'

class TodoAppTasks extends Component {
  render () {
    return (
      <div className='todo-lists'>
        <h2>My Lists </h2>
        <div>
          <input
            className='new-todo-input'
            placeholder='Search | Create a List'
          />
          <button className='btn'>
            +
          </button>
        </div>
        <ul>
          <li>
            <span>Ravindra</span>
            <button className='btn-delete'>Delete</button>
            <button className='btn-edit'>Edit</button>
            <button className='btn-edit'>Save</button>
          </li>
        </ul>
        <p className='empty-list'>
          Pheww, List is Empty. Let's Chill & Netflix 🍕🍔🍺
        </p>
      </div>
    )
  }
}

export default TodoAppTasks
