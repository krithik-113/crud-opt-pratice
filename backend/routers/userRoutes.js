const express = require('express')
const { addUser, userUpdate, getUsers, deleteUser } = require('../controllers/userController')
const userRouter = express.Router()

userRouter.get('/getUsers',getUsers)
userRouter.post('/addUser', addUser)
userRouter.put('/updateUser/:id', userUpdate)
userRouter.delete('/delete/:id',deleteUser)

module.exports = userRouter