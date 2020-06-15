const Todo = require('../models/todoSchema')

exports.get_tasks = async (req, res) => {
  try {
    const { id } = req.params
    const list = await Todo.findOne({ _id: id })
    if (!list) {
      return res.status(404).json({ error: 'list doesnt exist' })
    }
    const items = list.tasks
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.add_task = async (req, res) => {
  try {
    const { id } = req.params
    // const { newItem, note, priority, date, completed } = req.body
    const { newItem } = req.body
    const list = await Todo.findOne({ _id: id })
    if (!list) {
      return res.status(404).json({ error: 'list doesnt exist' })
    }
    const item = {
      name: newItem,
      // note: note,
      // date: date,
      // priority: priority,
      // completed: completed,
      createdAt: Date.now()
    }
    list.tasks.push(item)
    await list.save()
    res.status(200).send(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.update_task = async (req, res) => {
  try {
    const { id } = req.params
    const { tid } = req.params
    const { newItem, note, priority, date, completed } = req.body
    const list = await Todo.findOne({ _id: id })
    if (!list) {
      return res.status(404).json({ error: 'list doesnt exist' })
    }
    const items = list.tasks
    let count = 0
    for (const item of items) {
      if (item.id === tid) {
        item.name = newItem
        item.note = note
        item.priority = priority
        item.date = date
        item.completed = completed
        count++
      }
    }
    if (count === 0) res.status(404).json({ error: 'item doesnt exist' })
    await list.save()
    res.status(200).send({ updated: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.delete_task = async (req, res) => {
  try {
    const { id } = req.params
    const { tid } = req.params
    const list = await Todo.findOne({ _id: id })
    if (!list) {
      return res.status(404).json({ error: 'list doesnt exist' })
    }
    const index = list.tasks.findIndex(item => item.id === tid)
    if (index !== -1) {
      list.tasks.splice(index, 1)
      await list.save()
      res.status(200).json({ message: 'item is deleted' })
    }
    res.status(404).json({ error: 'item doesnt exist' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}