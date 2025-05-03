const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const app = express()
const messageRoutes = require('./routes/messagesRouter')
const { username, password, port } = require('./config')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath))

//connect to mongoDB

const dbURI = `mongodb+srv://${username}:${password}@cluster.tlis9o9.mongodb.net/texting-db?retryWrites=true&w=majority&appName=cluster`

mongoose
  .connect(dbURI)

  .then(result => app.listen(port))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.redirect('/messages')
})

app.use('/messages', messageRoutes)

app.get('/new', (req, res) => {
  res.render('new', { title: 'New Message' })
})

app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send('Something broke!')
})
app.use((req, res) => {
  res.status(404).send('404 Page not found')
})
