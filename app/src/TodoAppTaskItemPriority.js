import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const API_URL = 'http://localhost:5000/lists'

function TodoAppTaskItemPriority (props) {
  const { id, tid } = useParams()
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({})
  // const [name, setName] = useState('')
  // const [date, setDate] = useState('')
  // const [priority, setPriority] = useState('')
  // const [note, setNote] = useState('')
  // const [completed, setCompleted] = useState(false)

  useEffect(() => {
    fetch(API_URL + `/${id}/tasks`)
      .then(response => response.json())
      .then(res => {
        setTasks(res)
        for (const t of res) {
          if (t._id === tid) setTask(t)
        }
      })   
  }, [])

  const update = () => {
    fetch(API_URL + `/${id}/tasks/${tid}`, {
      method: 'PUT',
      body: JSON.stringify({ newItem: task.name, note: task.note, date: task.date, priority: task.priority, completed: task.completed }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
  }

  const updateData = (obj) => {
    if (obj.type === 'note') {
      task.note = obj.value
      setTask(task)
    }
    if (obj.type === 'date') {
      task.date = obj.value
      setTask(task)
    }
    if (obj.type === 'priority') {
      task.priority = obj.value
      setTask(task)
    }
    if (obj.type === 'name') {
      task.name = obj.value
      setTask(task)
    }
    update()
  }

  const updateName = event => {
    const taskName = event.target.value
    if (event.keyCode === 13) return updateData({ type: 'name', value: taskName })
  }

  return (
    <div className='todo-lists'>
      <div className='todo-header' />
      <button
        className='btn'
        onClick={() => updateName()}
      >
    edit
      </button>
      <h2 className='task-list-title'>
        {task.name}
        <input
          type='text'
          placeholder='Please enter a task name'
          defaultValue={task.name}
          onKeyDown={e => updateName(e)}
        />
      </h2>

      <div className='tasks form'>

        Note: <br />
        <textarea
          cols='62'
          rows='10'
          placeholder=''
          defaultValue={task.note}
          onKeyDown={e => {
            if (e.keyCode === 13 && e.shiftKey) updateData({ type: 'note', value: e.target.value })
          }}
        /><br />

        Date: <br />
        <input
          defaultValue={task.date}
          type='date'
          onChange={e => updateData({ type: 'date', value: e.target.value })}
        /> <br />

        Priority: <br />
        <select
          value={task.priority}
          onChange={e => updateData({ type: 'priority', value: e.target.value })}
        >
          <option value='None'>None</option>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
      </div>
      <Link to='/'>
        <button
          className='btn'
        >
          Back
        </button>
      </Link>
    </div>
  )
}

export default TodoAppTaskItemPriority
