const router = require('express').Router()
const TodoController = require('../controllers/TodoController');
const {authentication, authorization} = require('../middleware/auth');

router.use(authentication)
router.get('/',TodoController.getAllTodo);
router.post('/',TodoController.added);
router.delete('/:id',authorization,TodoController.delete);
router.get('/:id',authorization,TodoController.edit);
router.put('/:id',authorization,TodoController.editPost);
router.put('/:id/done',authorization,TodoController.editPostDone);

module.exports = router;