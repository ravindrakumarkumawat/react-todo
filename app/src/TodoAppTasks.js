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
      <span>{props.list.name} </span>
      <input
        placeholder='Update the list name'
      />
      <button className='btn-delete' onClick={() => props.deleteList()}>Delete</button>
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
        props.lists.map(list => <List key={list._id} list={list} deleteList={() => props.deleteList(list._id)} />)
      }
    </ul>
  )
}

class TodoAppTasks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  handleChange (event) {
    this.setState({ input: event.target.value })
  }

  handleKeyPressed (event) {
    if (event.key === 'Enter') {
      this.handleInput()
    }
  }

  handleInput () {
    const value = this.state.input
    this.props.onClick(value)
    this.setState({ input: '' })
  }

  render () {
    const { lists } = this.props
    const { input } = this.state
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
          <button className='btn' onClick={() => this.handleInput()}>
            +
          </button>
        </div>
        <Lists lists={lists} deleteList={this.props.deleteList} />
        <p className='empty-list'>
          Pheww, List is Empty. Lets Chill & Netflix 🍕🍔🍺
        </p>
      </div>
    )
  }
}

export default TodoAppTasks
