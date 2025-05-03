const Message = require('../models/messages')

const getMessages = (req, res) => {
  Message.find()
    .sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { title: 'All messages', messages: result })
    })
    .catch(err => console.log(err))
}

const createMessage = (req, res) => {
  const message = new Message(req.body)
  message
    .save()
    .then(result => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
}

const deleteMessage = (req, res) => {
  const id = req.params.id
  Message.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/' })
    })
    .catch(err => console.log(err))
}

module.exports = {
  getMessages,
  createMessage,
  deleteMessage
}
