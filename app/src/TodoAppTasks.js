import React, { Component } from 'react'
import Lists from './Lists'

const API_URL = 'http://localhost:5000/lists'

class TodoAppTasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: [],
      input: ''
    }
  }

  componentDidMount () {
    fetch(API_URL)
      .then(response => response.json())
      .then(res => {
        this.setState({ lists: res })
      })
  }

  handleChange (event) {
    this.setState({ input: event.target.value })
  }

  handleKeyPressed (event) {
    if (event.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleSubmit () {
    const value = this.state.input
    if (value) {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ newList: value }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((res) => {
          this.setState({ lists: [...this.state.lists, res] })
          this.setState({ input: '' })
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

  render () {
    const { lists, input } = this.state
    return (
      <div className='todo-lists'>
        <h2>My Lists </h2>
        <div>
          <input
            className='new-todo-input'
            placeholder='Search | Create a List'
            value={input}
            onChange={(event) => this.handleChange(event)}
            onKeyPress={(event) => this.handleKeyPressed(event)}
          />
          <button className='btn' onClick={() => this.handleSubmit()}>
            +
          </button>
        </div>
        <Lists
          lists={lists}
          deleteList={this.deleteList}
          updateList={this.updateList}
        />
        <p className='empty-list'>
          Pheww, List is Empty. Lets Chill & Netflix
        </p>
      </div>
    )
  }
}

export default TodoAppTasks
