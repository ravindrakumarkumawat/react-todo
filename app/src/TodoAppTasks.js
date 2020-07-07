import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Lists from './Lists'

const API_URL = 'http://localhost:5000/lists'

// class TodoAppTasks extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       lists: [],
//       input: ''
//     }
//   }

//   componentDidMount () {
//     fetch(API_URL)
//       .then(response => response.json())
//       .then(res => {
//         this.setState({ lists: res })
//       })
//   }

//   handleChange (event) {
//     this.setState({ input: event.target.value })
//   }

//   handleKeyPressed (event) {
//     if (event.key === 'Enter') {
//       this.handleSubmit()
//     }
//   }

//   handleSubmit () {
//     const value = this.state.input
//     if (value) {
//       fetch(API_URL, {
//         method: 'POST',
//         body: JSON.stringify({ newList: value }),
//         headers: {
//           'content-type': 'application/json'
//         }
//       })
//         .then(response => response.json())
//         .then((res) => {
//           this.setState({ lists: [...this.state.lists, res] })
//           this.setState({ input: '' })
//         })
//     }
//   }

//   deleteList (id) {
//     fetch(API_URL + `/${id}`, {
//       method: 'DELETE'
//     })
//       .then(response => response.json())
//       .then(() => {
//         this.setState({
//           lists: this.lists.filter(list => list._id !== id)
//         })
//       })
//   }

//   updateList (name, id) {
//     console.log(name)
//     console.log(id)
//     fetch(API_URL + `/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({ newList: name }),
//       headers: {
//         'content-type': 'application/json'
//       }
//     })
//       .then(response => response.json())
//       .then(() =>
//         this.setState({
//           lists: this.lists.map(list => {
//             if (list.id === id) {
//               list.name = name
//             }
//           })
//         })
//       )
//   }

//   render () {
//     const { lists, input } = this.state
//     return (
//       <div className='todo-lists'>
//         <h2>My Lists </h2>
//         <div>
//           <input
//             className='new-todo-input'
//             placeholder='Search | Create a List'
//             value={input}
//             onChange={(event) => this.handleChange(event)}
//             onKeyPress={(event) => this.handleKeyPressed(event)}
//           />
//           <button className='btn' onClick={() => this.handleSubmit()}>
//             +
//           </button>
//         </div>
//         <Lists
//           lists={lists}
//           deleteList={this.deleteList}
//           updateList={this.updateList}
//         />
//         <p className='empty-list'>
//           Pheww, List is Empty. Lets Chill & Netflix
//         </p>
//       </div>
//     )
//   }
// }

function TodoAppTasks (props) {
  const [lists, setLists] = useState([])
  const [input, setInput] = useState('')
  const [newInput, setNewInput] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(res => {
        setLists(res)
      })
  }, [])

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const handleKeyPressed = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    const value = input
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
          const newlists = [...lists, res]
          setLists(newlists)
          setInput('')
        })
    }
  }

  const deleteList = (id) => {
    fetch(API_URL + `/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setLists(lists.filter(list => list._id !== id)
        )
      })
  }

  const updateList = (name, id) => {
    fetch(API_URL + `/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ newList: name }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(() =>
        setLists(
          lists.map(list => {
            if (list.id === id) {
              list.name = name
            }
          })
        )
      )
  }

  return (
    <div className='todo-lists'>
      <h2>My Lists </h2>
      <div>
        <input
          className='new-todo-input'
          placeholder='Search | Create a List'
          value={input}
          onChange={(event) => handleChange(event)}
          onKeyPress={(event) => handleKeyPressed(event)}
        />
        <button className='btn' onClick={() => handleSubmit()}>
            +
        </button>
      </div>
      <ul>
        {
          lists.map(list =>
            <li key={list._id}>
              <span className='list'><Link to={`tasks/${list._id}`}>{list.name}</Link> </span>
              <button
                className='btn-delete'
                onClick={() => deleteList(list._id)}
              >
                Delete
              </button>
            </li>
          )
        }
      </ul>
      <p className='empty-list'>
          Pheww, List is Empty. Lets Chill & Netflix
      </p>
    </div>
  )
}

export default TodoAppTasks
