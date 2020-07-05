import React, { Component } from 'react'

class TodoAppTaskItems extends Component {
  render () {
    return (
      <div className='todo-lists'>
        <div className='hide'>
          <div className='todo-header'>
            <h2>
                selectedList.list
            </h2>
          </div>

          <div className='add-list-form'>
            <input placeholder='Search | Add List Item' />

            <button
              className='btn create'
            >+
            </button>
          </div>
          <ul>
            <li>
              <div>
                <input
                  type='checkbox'
                />
                <span>
                         item.item
                </span>
                <input
                  placeholder='Update The List Item'
                />
                <button
                  className='btn-delete'
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
          <button
            className='btn'
          >
                Back
          </button>
        </div>
      </div>
    )
  }
}

export default TodoAppTaskItems
