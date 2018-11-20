const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const ageMiddleware = (req, res, next) => {
  if (!req.body.age) {
    return res.redirect('/')
  }
  return next()
}
const users = ['thecastor', 'alvaro', 'marques']

// app.get('/', (req, res) => {
//   return res.render('list', { users })
// })

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', (req, res) => {
  users.push(req.body.user)
  return res.redirect('/')
})

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', ageMiddleware, (req, res) => {
  let age = req.body.age
  age > 18 ? res.render('major', { age }) : res.render('minor', { age })
})

app.listen(3000)
