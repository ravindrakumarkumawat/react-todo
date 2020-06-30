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

function List (props) {
  return (
    <li>
      <span>{props.list}</span>
      <button className='btn-delete'>Delete</button>
      <button className='btn-edit'>Edit</button>
      <button className='btn-edit'>Save</button>
    </li>
  )
}

function Lists (props) {
  // const list = props.lists.map((list, index) =>
  //   <List key={index} list={list} />
  // )

  // return (
  //   <ul>
  //     {list}
  //   </ul>
  // )
  return (
    <ul>
      {
        props.lists.map((list, index) => <List key={index} list={list} />)
      }
    </ul>
  )
}

class TodoAppTasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: ['tasks1', 'tasks2', 'tasks4', 'My name is ravindra kumawat', 'saviour']
    }
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  render () {
    const { lists } = this.state
    return (
      <div className='todo-lists'>
        <h2>My Lists </h2>
        <TodoInput />
        <Lists lists={lists} />
        <p className='empty-list'>
          Pheww, List is Empty. Lets Chill & Netflix 🍕🍔🍺
        </p>
      </div>
    )
  }
}

export default TodoAppTasks
