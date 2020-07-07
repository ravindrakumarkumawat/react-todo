import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const API_URL = 'http://localhost:5000/lists'

// class TodoAppTaskItems extends Component {
//   render () {
//     return (
//       <div className='todo-lists'>
//         <div className='hide'>
//           <div className='todo-header'>
//             <h2>
//                 selectedList.list
//             </h2>
//           </div>

//           <div className='add-list-form'>
//             <input placeholder='Search | Add List Item' />

//             <button
//               className='btn create'
//             >+
//             </button>
//           </div>
//           <ul>
//             <li>
//               <div>
//                 <input
//                   type='checkbox'
//                 />
//                 <span>
//                          item.item
//                 </span>
//                 <input
//                   placeholder='Update The List Item'
//                 />
//                 <button
//                   className='btn-delete'
//                 >
//                             Delete
//                 </button>
//                 <button
//                   className='btn-edit'
//                 >
//                             Edit
//                 </button>
//                 <button
//                   className='btn-edit'
//                 >
//                             Save
//                 </button>
//               </div>
//             </li>
//           </ul>

//           <p
//             className='empty-list'
//           >
//                 Ohh No, List has no item. Add some item
//           </p>
//           <button
//             className='btn'
//           >
//                 Clear Completed Item
//           </button>
//           <button
//             className='btn'
//           >
//                 Back
//           </button>
//         </div>
//       </div>
//     )
//   }
// }

function TodoAppTaskItems (props) {
  const { listId } = useParams()
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')
  const [list, setList] = useState({})
  const [eListName, setEListName] = useState(false)

  useEffect(() => {
    fetch(API_URL + `/${listId}/tasks`)
      .then(response => response.json())
      .then(res => {
        setTasks(res)
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
      fetch(API_URL + `/${listId}/tasks`, {
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
    fetch(API_URL + `/${listId}/tasks/${tid}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setTasks(tasks.filter(task => task._id !== tid)
        )
      })
  }

  const updateListName = event => {
    const listName = event.target.value
    if (event.keyCode === 13 && listName.length) {
      fetch(API_URL + `/${listId}`, {
        method: 'PUT',
        body: JSON.stringify({ newList: listName }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(() => {
          setList({ ...list, name: listName })
          setEListName(false)
        }
        )
    }
    if (event.keyCode === 27 && !listName.length) return setEListName(false)
  }



  return (
    <div className='todo-lists'>
      <div className='hide'>
        <div className='todo-header'>
          <div id='tasks-ctnr-header'>
            {eListName ? (
              <input
                type='text'
                placeholder='Enter a list name'
                defaultValue={list.name}
                onKeyDown={e => updateListName(e)}
              />
            ) : (
              <h3>{list.name}</h3>
            )}
            <button
              className='btn-edit'
              onClick={() => setEListName(true)}
            >
              Edit
            </button>
          </div>
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
            tasks.map(task =>
              <li key={task._id}>
                <div>
                  <input
                    type='checkbox'
                    defaultChecked={task.completed}
                    onClick={e => completeTask(task._id, e.target.checked)}
                  />
                  <span className='task'>{task.name} </span>
                  <input
                    placeholder='Update The List Item'
                  />
                  <button
                    className='btn-delete'
                    onClick={() => deleteTask(task._id)}
                  >
                  Delete
                  </button>
                  <button
                    className='btn-edit'
                  >
                                Edit
                  </button>
                  <button
                    className='btn-edit'
                  >
                                Save
                  </button>
                </div>
              </li>
            )
          }
        </ul>

        <p
          className='empty-list'
        >
                    Ohh No, List has no item. Add some item
        </p>
        <button
          className='btn'
        >
                    Clear Completed Item
        </button>
        <Link to='/'>
          <button
            className='btn'
          >
          Back
          </button>
        </Link>
      </div>
    </div>
  )
}

export default TodoAppTaskItems
