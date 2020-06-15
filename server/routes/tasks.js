const express = require('express')
const router = express.Router({ mergeParams: true })

const tasks = require('../controller/tasks')

router.get('/', tasks.get_tasks)
router.post('/', tasks.add_task)
router.put('/:tid', tasks.update_task)
router.delete('/:tid', tasks.delete_task)

module.exports = router
