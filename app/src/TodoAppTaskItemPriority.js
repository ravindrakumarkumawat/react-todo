import React, { Component } from 'react'

class TodoAppTaskItemPriority extends Component {
  render () {
    return (
      <div className='todo-lists'>
        <h2 className='task-list-title'>
          selectedListItem.item
        </h2>

        <div className='tasks form'>

          Note: <br />
          <textarea
            cols='62'
            rows='10'
            placeholder='Write something'
          /><br />

              Date: <br />
          <input
            type='date'
          /> <br />

                    Priority: <br />
          <select>
            <option>
                          option
            </option>
            <option>
                          option
            </option>
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
}

export default TodoAppTaskItemPriority
