import React, { useState, useEffect } from 'react'

const API_URL = 'http://localhost:5000/lists'

function TodoAppTaskItemPriority (props) {
  const { task, id } = props
  const [edit, setEdit] = useState(false)

  useEffect(() => update())

  const update = () => {
    fetch(API_URL + `/${id}/tasks/${task._id}`, {
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
    }
    if (obj.type === 'note') {
      task.note = obj.value
    }
    if (obj.type === 'date') {
      task.date = obj.value
    }
    if (obj.type === 'name') {
      task.name = obj.value
    }
    update()
  }

  const handleChange = (event) => {
    const taskName = event.target.value
    if (event.key === 'Enter' && taskName.length > 0) {
      updateData({ type: 'name', value: taskName })
      setEdit(false)
    }
  }

  return (
    <div className='todo-lists'>
      <div className='todo-header'>
        {!edit ? (
          <span>
            <h2>{task.name}</h2>
            <button className='btn' onClick={() => setEdit(true)}>Edit</button>
          </span>
        ) : (
          <div>
            <input
              type='text'
              placeholder='Please enter a task name'
              defaultValue={task.name}
              onKeyDown={(event) => handleChange(event)}
            />
          </div>
        )}
      </div>
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
          defaultValue={task.priority}
          onChange={e => updateData({ type: 'priority', value: e.target.value })}
        >
          <option value='None'>None</option>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
      </div>
      <button className='btn' onClick={() => props.close()}>Close</button>
    </div>
  )
}

export default TodoAppTaskItemPriority
