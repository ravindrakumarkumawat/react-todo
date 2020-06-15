const Todo = require('../models/todoSchema')

// get all the lists
exports.get_lists = async (req, res) => {
  try {
    const lists = await Todo.find()
    res.status(200).json(lists)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.add_list = async (req, res) => {
  try {
    const { newList } = req.body
    const list = await Todo.create({ name: newList })
    res.status(200).json({ _id: list._id, name: newList })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.update_list = async (req, res) => {
  try {
    const { id } = req.params
    const { newList } = req.body
    const list = await Todo.findOneAndUpdate({ _id: id }, { name: newList }, { new: true })
    if (!list) {
      return res.status(404).json({ error: 'list doesnt exist' })
    }
    res.status(200).json({ _id: id, name: newList })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.delete_list = async (req, res) => {
  try {
    const { id } = req.params
    const del = await Todo.findOneAndDelete({ _id: id })
    if (!del) {
      return res.status(404).json({ error: 'The list does not exists' })
    }
    res.status(200).json({ deleted: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}