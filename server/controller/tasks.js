const { Todo } = require('../models/todoSchema')

exports.get_tasks = async (req, res) => {
  try {
    const { id } = req.params
    const list = await hexists(id, 'list')
    if (!list) {
      return res.status(404).json({ error: 'list doesnt exist' })
    }
    let items = await hget(id, 'items')
    items = JSON.parse(items)
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.add_task = async (req, res) => {
  try {
    const { id } = req.params
    const { newItem, noteText, priority, date, completed } = req.body
    const list = await hexists(id, 'list')
    if (!list) {
      return res.status(404).json({ error: 'list doesnt exist' })
    }
    const item = {
      item_id: Date.now(),
      item: newItem,
      noteText: noteText,
      date: date,
      priority: priority,
      completed: completed
    }
    let items = await hget(id, 'items')
    items = JSON.parse(items)
    items.push(item)
    await hset(id, 'items', JSON.stringify(items))
    res.status(200).send(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.update_task = async (req, res) => {
  try {
    const { id } = req.params
    const { tid } = req.params
    const { newItem, noteText, priority, date, completed } = req.body
    const list = await hexists(id, 'list')
    if (!list) {
      return res.status(404).json({ error: 'list doesnt exist' })
    }
    let items = await hget(id, 'items')
    items = JSON.parse(items)
    let count = 0
    for (const item of items) {
      if (item.item_id === parseInt(tid)) {
        item.item = newItem
        item.noteText = noteText
        item.priority = priority
        item.date = date
        item.completed = completed
        count++
      }
    }
    if (count === 0) res.status(404).json({ error: 'item doesnt exist' })
    await hset(id, 'items', JSON.stringify(items))
    res.status(200).send({ updated: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// exports.update_priority_task = async (req, res) => {
//   try {
//     const { id } = req.params
//     const { tid } = req.params
//     const { noteText } = req.body
//     const { date } = req.body
//     const { priority } = req.body
//     const list = await hexists(id, 'list')
//     if (!list) {
//       return res.status(404).json({ error: 'list doesnt exist' })
//     }
//     let items = await hget(id, 'items')
//     items = JSON.parse(items)
//     let count = 0
//     for (const item of items) {
//       if (item.item_id === parseInt(tid)) {
//         item.noteText = noteText
//         item.date = date
//         item.priority = priority
//         count++
//       }
//     }
//     if (count === 0) res.status(404).json({ error: 'item doesnt exist' })
//     await hset(id, 'items', JSON.stringify(items))
//     res.status(200).send({ updated: true })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

exports.delete_task = async (req, res) => {
  try {
    const { id } = req.params
    const { tid } = req.params
    const list = await hexists(id, 'list')
    if (!list) {
      return res.status(404).json({ error: 'list doesnt exist' })
    }
    let items = await hget(id, 'items')
    items = JSON.parse(items)
    const len1 = items.length
    items = items.filter(item => item.item_id !== parseInt(tid))
    const len2 = items.length
    await hset(id, 'items', JSON.stringify(items))
    if (len1 !== len2) res.status(200).json({ deleted: true })
    else res.status(404).json({ error: 'item doesnt exist' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}