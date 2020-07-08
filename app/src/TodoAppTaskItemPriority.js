import React, { useState, useEffect } from 'react'
import { useParams, Link} from 'react-router-dom'

const API_URL = 'http://localhost:5000/lists'
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
  const { id, tid } = useParams()
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [priority, setPriority] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    fetch(API_URL + `/${id}/tasks`)
      .then(response => response.json())
      .then(res => {
        const tasks = res
        for (const task of tasks) {
          if (task._id === tid) {
            setName(task.name)
            setDate(task.date)
            setNote(task.note)
            setPriority(task.priority)
          }
        }
      })
  })

  // const task = props.task
  // const update = props.update

  const update = (task) => {
    // fetch(API_URL + `/${id}/tasks/${task._id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ newItem: task.name, note: task.note, date: task.date, priority: task.priority, completed: !task.completed }),
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // })
    //   .then(response => response.json())
  }

  const updateData = (obj) => {
    // if (obj.type === 'note') {
    //   task.note = obj.value
    // }
    // if (obj.type === 'date') {
    //   task.date = obj.value
    // }
    // if (obj.type === 'priority') {
    //   task.priority = obj.value
    // }
    // if (obj.type === 'name') {
    //   task.name = obj.value
    // }
    // update(task)
  }

  const updateName = event => {
    const taskName = event.target.value
    if (event.keyCode === 13) return updateData({ type: 'name', value: taskName })
  }

  return (
    <div className='todo-lists'>
      <div className='todo-header'>
      </div>
      <button
        className='btn'
        onClick={() => console.log('Hi there')}
      >
    edit
      </button>
      <h2 className='task-list-title'>
        {name}
        <input
          type='text'
          placeholder='Please enter a task name'
          defaultValue={name}
          onKeyDown={e => updateName(e)}
        />
      </h2>

      <div className='tasks form'>

        Note: <br />
        <textarea
          cols='62'
          rows='10'
          placeholder=''
          defaultValue={note}
          onKeyDown={e => {
            if (e.keyCode === 13 && e.shiftKey) updateData({ type: 'note', value: e.target.value })
          }}
        /><br />

        Date: <br />
        <input
          defaultValue={date}
          type='date'
          onChange={e => updateData({ type: 'date', value: e.target.value })}
        /> <br />

        Priority: <br />
        <select
          defaultValue={priority}
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
