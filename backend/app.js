const express = require('express')
const cors = require('cors')
const mongoDBConnection = require('./utils/mongoDBCon')
const app = express()


app.use(express.json())
app.use(cors());
mongoDBConnection()

app.use('/user/api',require('./routers/userRoutes'))

app.get('/', (req, res) => {
    res.json({message:"Server is LIVE"})
})

app.listen(3007,'0.0.0.0', () => {
    console.log(`Server is successfully running on port ${3007}`)
})