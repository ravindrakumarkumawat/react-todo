import React, { Component } from 'react'
import TodoAppTasks from './TodoAppTasks'
import TodoAppTaskItems from './TodoAppTaskItems'
import TodoAppTaskItemPriority from './TodoAppTaskItemPriority'

const API_URL = 'http://localhost:5000/lists'

class TodoApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: [],
      list: []
    }
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleKeyPressed = this.handleKeyPressed.bind(this)
  }

  componentDidMount () {
    fetch(API_URL)
      .then(response => response.json())
      .then(res => {
        this.setState({ lists: res })
      })
  }

  handleSubmit (input) {
    console.log(input)
    if (input) {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ newList: input }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((res) => {
          this.setState({ lists: [...this.state.lists, res] })
        })
    }
  }

  deleteList (id) {
    fetch(API_URL + `/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        this.setState({
          lists: this.lists.filter(list => list._id !== id)
        })
      })
  }

  updateList (name, id) {
    console.log(name)
    console.log(id)
    fetch(API_URL + `/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ newList: name }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(() =>
        this.setState({
          lists: this.lists.map(list => {
            if (list.id === id) {
              list.name = name
            }
          })
        })
      )
  }

  selectedList (id) {
    console.log(id)
  }

  render () {
    const { lists } = this.state
    return (
      <div>
        <div className='header'>
          <h1 className='title'>ToDo App: React.js, MongoDB & ExpressJs</h1>
        </div>
        <TodoAppTasks
          lists={lists}
          onClick={this.handleSubmit}
          deleteList={this.deleteList}
          updateList={this.updateList}
          selectedList={this.selectedList}
        />
        <TodoAppTaskItems />
        <TodoAppTaskItemPriority />
      </div>
    )
  }
}

export default TodoApp
