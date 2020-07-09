import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import TodoAppTaskItemPriority from './TodoAppTaskItemPriority'

const API_URL = 'http://localhost:5000/lists'

function TodoAppTaskItems (props) {
  const { id } = useParams()
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [list, setList] = useState('')
  const [editList, setEditList] = useState(false)
  const [editTask, setEditTask] = useState({ status: false, index: null })

  useEffect(() => {
    fetch(API_URL + `/${id}/tasks`)
      .then(response => response.json())
      .then(res => {
        setTasks(res)
      })
    listName()
  }, [])

  const listName = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(res => {
        const lists = res
        lists.map((list) => {
          if (list._id === id) {
            setList(list.name)
          }
        })
      })
  }

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
      fetch(API_URL + `/${id}/tasks`, {
        method: 'POST',
        body: JSON.stringify({ newItem: value }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((res) => {
          const newTasks = [...tasks, res]
          setTasks(newTasks)
          setInput('')
        })
    }
  }

  const deleteTask = (tid) => {
    fetch(API_URL + `/${id}/tasks/${tid}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setTasks(tasks.filter(task => task._id !== tid)
        )
      })
  }

  const completeTask = (task) => {
    fetch(API_URL + `/${id}/tasks/${task._id}`, {
      method: 'PUT',
      body: JSON.stringify({ newItem: task.name, note: task.note, date: task.date, priority: task.priority, completed: !task.completed }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
  }

  const handleChangeList = (event) => {
    setList(event.target.value)
  }

  const handleKeyPressedList = (event) => {
    if (event.key === 'Enter') {
      handleSubmitList()
    }
  }

  const handleSubmitList = () => {
    const value = list
    if (value) {
      fetch(API_URL + `/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ newList: value }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(() =>
          setList(list)
        )
      setEditList(false)
    }
  }

  return (
    <div className='todo-lists'>
      <div className='hide'>
        <div className='todo-header'>
          {!editList
            ? <h2 className='list-title' id='listTitleElement'>{list}</h2>
            : <h2>
              <input
                type='text'
                placeholder='Please enter a task name'
                value={list}
                onChange={(event) => handleChangeList(event)}
                onKeyPress={(event) => handleKeyPressedList(event)}
              />
            </h2>}
          {!editList
            ? <button className='btn' onClick={() => setEditList(true)}>Edit</button>
            : <button className='btn' onClick={() => handleSubmitList()}>Save</button>}
        </div>

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
            tasks.map((task, index) =>
              <li key={task._id}>
                <div>
                  <input
                    type='checkbox'
                    defaultChecked={task.completed}
                    onClick={() => completeTask(task)}
                  />
                  <span
                    className='task'
                    onClick={() => setEditTask({ status: true, index: index })}
                  >{task.name}
                  </span>
                  <button
                    className='btn-delete'
                    onClick={() => deleteTask(task._id)}
                  >
                  Delete
                  </button>
                </div>
              </li>
            )
          }
        </ul>

        {tasks.length === 0
          ? <p className='empty-list'>Ohh No, List has no item. Add some item</p>
          : ''}
        <Link to='/'>
          <button
            className='btn'
          >
          Back
          </button>
        </Link>
      </div>
      {editTask.status ? (
        <TodoAppTaskItemPriority
          id={id}
          task={tasks[editTask.index]}
          close={() => setEditTask({ status: false, index: null })}
        />
      ) : ('')}
    </div>
  )
}

export default TodoAppTaskItems
