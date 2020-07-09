import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const API_URL = 'http://localhost:5000/lists'

function TodoAppTaskItemPriority (props) {
  const { id, tid } = useParams()
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({})
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    fetch(API_URL + `/${id}/tasks`)
      .then(response => response.json())
      .then(res => {
        setTasks(res)
        for (const t of res) {
          if (t._id === tid) {
            setTask(t)
            setName(t.name)
            setNote(t.note)
            setDate(t.date)
          }
        }
      })
  }, [])

  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleKeyPressedName = (event) => {
    if (event.key === 'Enter') {
      handleSubmitName()
    }
  }

  const handleSubmitName = () => {
    updateData({ type: 'name', value: name })
  }

  const handleChangeNote = (event) => {
    setNote(event.target.value)
  }

  const handleKeyDownNote = (event) => {
    if (event.keyCode === 13 && event.shiftKey) { 
      updateData({ type: 'note', value: note })
    }
  }

  const handleChangeDate = (event) => {
    setDate(event.target.value)
    updateData({ type: 'date', value: date })
  }

  const update = () => {
    fetch(API_URL + `/${id}/tasks/${tid}`, {
      method: 'PUT',
      body: JSON.stringify({ newItem: task.name, note: task.note, date: task.date, priority: task.priority, completed: task.completed }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
    setEdit(false)
  }

  const updateData = (obj) => {    
    if (obj.type === 'priority') {
      task.priority = obj.value
      setTask(task)
    }
    if (obj.type === 'note') {
      task.note = obj.value
      setTask(task)
    }
    if (obj.type === 'date') {
      task.date = obj.value
      setTask(task)
    }
    if (obj.type === 'name') {
      task.name = obj.value
      setTask(task)
    }
    update()
  }

  // const updateName = event => {
  //   const taskName = event.target.value
  //   if (event.keyCode === 13) return updateData({ type: 'name', value: taskName })
  // }

  return (
    <div className='todo-lists'>
      <div className='todo-header'>
      {!edit
        ? <h2 className='task-list-title'>
          {task.name}
        </h2>
        : <h2>
          <input
            type='text'
            placeholder='Please enter a task name'
            value={name}
            onChange={(event) => handleChangeName(event)}
            onKeyPress={(event) => handleKeyPressedName(event)}
          />
        </h2>}
      {edit
        ? <button
          className='btn'
          onClick={() => handleSubmitName()}
          >
        save
        </button>
        : <button
          className='btn'
          onClick={() => setEdit(true)}
          >
        edit
        </button>}
        </div>

        <div className='tasks form'>

        Note: <br />
        <textarea
          cols='62'
          rows='10'
          placeholder=''
          value={note}
          onChange={(event) => handleChangeNote(event)}
          onKeyDown={(event) => handleKeyDownNote(event)}
        /><br />
        Date: <br />
        <input
          value={date}
          type='date'
          onChange={(event) => handleChangeDate(event)}
        /> <br />
      </div>

      <Link to='/'>
        <button className='btn'>Back</button>
      </Link>
    </div>
  )
}

export default TodoAppTaskItemPriority
