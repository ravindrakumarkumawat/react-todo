import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const API_URL = 'http://localhost:5000/lists'

function TodoAppTasks (props) {
  const [lists, setLists] = useState([])
  const [input, setInput] = useState('')
  const [searchList, setSearchList] = useState([])

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(res => {
        setLists(res)
        setSearchList(res)
      })
  }, [])

  const handleChange = (event) => {
    setInput(event.target.value)
    const newList = event.target.value
    if (newList.length > 0) {
      return setSearchList(
        lists.filter((list) => list.name.match(newList))
      )
    }
    setSearchList(lists)
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
          setSearchList(newlists)
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
        setLists(lists.filter(list => list._id !== id))
        setSearchList(lists.filter(list => list._id !== id))
      })
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
          searchList.slice(0).reverse().map(list =>
            <li key={list._id}>
              <span className='list'><Link to={`list/${list._id}/tasks`}>{list.name}</Link> </span>
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

      {lists.length === 0
        ? <p className='empty-list'>Pheww, List is Empty. Lets Chill & Netflix</p>
        : ''}
    </div>
  )
}

export default TodoAppTasks
