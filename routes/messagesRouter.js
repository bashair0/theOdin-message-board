const express = require('express')

const Message = require('../models/messages')
const messageRouter = express.Router()
const {
  getMessages,
  createMessage,
  deleteMessage
} = require('../controllers/messagesController')

messageRouter.get('/', getMessages)

messageRouter.post('/', createMessage)

messageRouter.delete('/:id', deleteMessage)

module.exports = messageRouter
