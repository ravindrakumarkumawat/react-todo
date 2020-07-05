import React, { Component } from 'react'

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

// function List (props) {
//   return (
//     <li>
//       <span>{props.list.name} </span>
//       <input
//         placeholder='Update the list name'
//       />
//       <button className='btn-delete' onClick={() => props.deleteList()}>Delete</button>
//       <button className='btn-edit'>Edit</button>
//       <button className='btn-edit' onClick={() => props.updateList()}>Save</button>
//     </li>
//   )
// }

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
        <Lists
          lists={lists}
          deleteList={this.props.deleteList}
          updateList={this.props.updateList}
          selectedList={this.props.selectedList}
        />
        <p className='empty-list'>
          Pheww, List is Empty. Lets Chill & Netflix
        </p>
      </div>
    )
  }
}

export default TodoAppTasks
