const router = require('express').Router();
const todoRouter = require('./todo');
const userRouter = require('./user');

router.get('/',(req,res)=>{
  res.status(200).json({msg:'hello world'})
})
router.use('/users',userRouter);

router.use('/todos',todoRouter);

module.exports = router;