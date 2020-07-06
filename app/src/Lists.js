import React, { Component } from 'react'

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
        <span>{list.name} </span>
        <input
          placeholder='Update the list name'
          value={input}
          onChange={(event) => this.handleChange(event)}
        />
        <button
          className='btn-delete'
          onClick={() => this.props.deleteList(list._id)}
        >
        Delete
        </button>
        <button className='btn-edit'>Edit</button>
        <button
          className='btn-edit'
          onClick={() => this.props.updateList(this.state.input, this.props.list._id)}
        >
        Save
        </button>
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
          />)
      }
    </ul>
  )
}

export default Lists

// <Lists
// lists={lists}
// deleteList={() => deleteList()}
// updateList={() => updateList()}
// />
