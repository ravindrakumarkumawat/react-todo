import React, { Component } from 'react'

const API_URL = 'http://localhost:5000/lists'

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
      <span>{props.list.name}</span>
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
        props.lists.map(list => <List key={list._id} list={list} />)
      }
    </ul>
  )
}

class TodoAppTasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: []
    }
  }

  componentDidMount () {
    fetch(API_URL)
      .then(response => response.json())
      .then(res => {
        this.setState({ lists: res })
      })
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
