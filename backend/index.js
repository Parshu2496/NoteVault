require("dotenv").config();
const connectToMongo = require("./db");
const express = require('express')
const app = express()
var cors = require('cors')
const port = 5000

app.use(cors())
connectToMongo();
app.use(express.json())
// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`Inotebook listening on http://localhost${port}`)
})
