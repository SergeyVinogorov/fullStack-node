const express = require('express')
const path = require('path')
const cors = require('cors')
const handleErrors = require('./middleware/handleError.middleware');

const app = express()
app.use(
  cors({
    credentials: true,
    origin: [process.env.CORS_HOST],
    optionsSuccessStatus: 200
  })
)

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use(handleErrors);

if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

module.exports = app;