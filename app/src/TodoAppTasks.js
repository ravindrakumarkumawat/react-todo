import React, { Component } from 'react'

const API_URL = 'http://localhost:5000/lists'

class List extends Component {
  constructor (props) {
    super(props)
    this.initialState = {
      input: this.props.list.name
    }
    this.state = this.initialState
  }

  handleChange (event) {
    const { value } = event.target
    this.setState({
      input: value
    })
  }

  render () {
    const { list } = this.props
    const { input } = this.state
    return (
      <li>
        <span onClick={() => this.props.selectedList(list._id)}>{list.name} </span>
        <input
          placeholder='Update the list name'
          value={input}
          onChange={(event) => this.handleChange(event)}
        />
        <button className='btn-delete' onClick={() => this.props.deleteList(list._id)}>Delete</button>
        <button className='btn-edit'>Edit</button>
        <button className='btn-edit' onClick={() => this.props.updateList(this.state.input, this.props.list._id)}>Save</button>
      </li>
    )
  }
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
        props.lists.map(list =>
          <List
            key={list._id}
            list={list}
            deleteList={props.deleteList}
            updateList={props.updateList}
            selectedList={props.selectedList}
          />)
      }
    </ul>
  )
}

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
