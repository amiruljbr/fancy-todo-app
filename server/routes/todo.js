const router = require('express').Router()
const TodoController = require('../controllers/TodoController');
const {authentication, authorization} = require('../middleware/auth');

router.use(authentication)
router.get('/',TodoController.getAllTodo);
router.post('/create',TodoController.added);
router.delete('/delete/:id',authorization,TodoController.delete);
router.post('/edit/:id',authorization,TodoController.editPost);

module.exports = router;