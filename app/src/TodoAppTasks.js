import React, { Component } from 'react'

const API_URL = 'http://localhost:5000/lists'

// class TodoInput extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       list: ''
//     }
//   }

//   render () {
//     return (
//       <div>
//         <input
//           className='new-todo-input'
//           placeholder='Search | Create a List'
//           value={this.state.value}

//         />
//         <button className='btn'>
//           +
//         </button>
//       </div>
//     )
//   }
// }

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
      lists: [],
      input: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyPressed = this.handleKeyPressed.bind(this)
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
    if (this.state.input) {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ newList: this.state.input }),
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
    const { lists, input } = this.state
    return (
      <div className='todo-lists'>
        <h2>My Lists </h2>
        <div>
          <input
            className='new-todo-input'
            placeholder='Search | Create a List'
            value={input}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPressed}
          />
          <button className='btn' onClick={this.handleSubmit}>
          +
          </button>
        </div>
        <Lists lists={lists} />
        <p className='empty-list'>
          Pheww, List is Empty. Lets Chill & Netflix 🍕🍔🍺
        </p>
      </div>
    )
  }
}

export default TodoAppTasks
