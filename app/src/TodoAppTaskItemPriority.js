import React, { useState } from 'react'

// class TodoAppTaskItemPriority extends Component {
//   render () {
//     return (
//       <div className='todo-lists'>
//         <h2 className='task-list-title'>
//           selectedListItem.item
//         </h2>

//         <div className='tasks form'>

//           Note: <br />
//           <textarea
//             cols='62'
//             rows='10'
//             placeholder='Write something'
//           /><br />

//               Date: <br />
//           <input
//             type='date'
//           /> <br />

//                     Priority: <br />
//           <select>
//             <option>
//                           option
//             </option>
//             <option>
//                           option
//             </option>
//           </select>
//         </div>
//         <button
//           className='btn'
//         >
//                       Update
//         </button>
//       </div>
//     )
//   }
// }
function TodoAppTaskItemPriority (props) {
  const task = props.task
  const update = props.update

  const updateData = (obj) => {
    if (obj.type === 'note') {
      task.note = obj.value
    }
    if (obj.type === 'date') {
      task.date = obj.value
    }
    if (obj.type === 'priority') {
      task.priority = obj.value
    }
    if (obj.type === 'name') {
      task.name = obj.value
    }
    return update(task)
  }

  const updateName = event => {
    const taskName = event.target.value
    if (event.keyCode === 13) return updateData({ type: 'name', value: taskName })
  }

  return (
    <div className='todo-lists'>
      <button
        className='btn'
        onClick={() => props.close()}
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
          defaultValue={task.priority}
          onChange={e => updateData({ type: 'priority', value: e.target.value })}
        >
          <option value='None'>None</option>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </select>
      </div>

      <button
        className='btn'
      >
        Update
      </button>
    </div>
  )
}

export default TodoAppTaskItemPriority
