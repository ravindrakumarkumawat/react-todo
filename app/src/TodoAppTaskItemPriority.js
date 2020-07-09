import React, { useState } from 'react'

function TodoAppTaskItemPriority (props) {
  const { task } = props
  const [edit, setEdit] = useState(false)

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
    props.update(task)
    setEdit(false)
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
          <h2>{task.name}</h2>
        ) : (
          <input
            type='text'
            placeholder='Please enter a task name'
            defaultValue={task.name}
            onKeyDown={(event) => handleChange(event)}
          />
        )}
        {!edit ? (
          <button
            className='btn common'
            onClick={() => setEdit(true)}
            disabled={!!task.completed}
          >Edit
          </button>
        ) : ('')}
      </div>
      <div className='tasks form priority'><br />
      Note: <br />
        <textarea
          cols='62'
          rows='10'
          placeholder='Write down something'
          className='noteText'
          defaultValue={task.note}
          onKeyDown={e => {
            if (e.keyCode === 13 && e.shiftKey) updateData({ type: 'note', value: e.target.value })
          }}
          disabled={!!task.completed}
        /><br />
        Date: <br />
        <input
          defaultValue={task.date}
          className='date'
          type='date'
          onChange={e => updateData({ type: 'date', value: e.target.value })}
          disabled={!!task.completed}
        /> <br />
        Priority: <br />
        <select
          className='select'
          defaultValue={task.priority}
          onChange={e => updateData({ type: 'priority', value: e.target.value })}
          disabled={!!task.completed}
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
