const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler')

app.use(express.urlencoded({extended:true}));
app.use('/',router);
app.use(errorHandler);


app.listen(port,()=>{
  console.log(`app run at http://localhost:${port}`);
})