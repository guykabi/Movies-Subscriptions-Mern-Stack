const express = require('express') 
const loginRouter = require('./routers/loginRouter')
const moviesRouter = require('./routers/moviesRouter')
const memeberRouter = require('./routers/membersRouter')
const subscribeRouter = require('./routers/subscribeRouter')

const cors = require('cors') 

const app = express();

app.use(cors()) 

app.use(express.json());


require('./configs/database');

app.use('/login',loginRouter);
app.use('/movies',moviesRouter)
app.use('/members',memeberRouter)
app.use('/subscribe',subscribeRouter)

app.listen(8000);
