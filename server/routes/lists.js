const express = require('express')
const router = express.Router()

const lists = require('../controller/lists')

router.get('/', lists.get_lists)
router.post('/', lists.add_list)
router.put('/:id', lists.update_list)
router.delete('/:id', lists.delete_list)

module.exports = router
