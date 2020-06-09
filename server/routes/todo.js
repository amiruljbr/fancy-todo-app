const router = require('express').Router()
const TodoController = require('../controllers/TodoController');

router.get('/',TodoController.getAllTodo);
router.post('/create',TodoController.added);

module.exports = router;