let express = require('express')
let { MongoClient, ObjectId } = require('mongodb')
let path = require('path');
let { mainPage } = require('./server/html/mainPage')
let { passwordProtected } = require('./server/js/functions')
let sanitizeHTML = require('sanitize-html')

let app = express()
let db

let connectDb = async () => {
  let client = new MongoClient('mongodb+srv://admin:Ramon160459@cluster0.hqr9rn3.mongodb.net/test01?retryWrites=true&w=majority')
  await client.connect()
  db = client.db()
}
connectDb()

app.use(express.static(path.join(__dirname, 'client')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passwordProtected)

app.get('/', (req, res) => {
  db.collection('items').find().toArray((err, items) => {
    res.send(mainPage(items))
  })
})

app.post('/create-item', (req, res) => {
  try {
    let { item } = req.body
    let safeText = sanitizeHTML(item,{allowedTags: [], allowedAttributes: {}})
    db.collection('items').insertOne({ text: safeText }, (err, info) => {
      res.json({ _id: info.insertedId, text: safeText })
    })
  } catch (err) {
    alert(`Could not add record to db. : ${err.message}`)
  }
})

app.post('/update-item', (req, res) => {
  try {
    let { item, id } = req.body
    let safeText = sanitizeHTML(item,{allowedTags: [], allowedAttributes: {}})
    db.collection('items').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { text: safeText } }, () => {
      res.send('ok')
    })
  } catch (err) {
    alert(`Could not update record in db. : ${err.message}`)
  }
})

app.post('/delete-item', (req, res) => {
  try {
    let { id } = req.body
    db.collection('items').deleteOne({ _id: new ObjectId(id) }, () => {
      res.send('ok')
    })
  } catch (err) {
    alert(`Could not delete record in db. : ${err.message}`)
  }
})

let port = process.env.PORT
if (port == null || port == "") {
  port = 3000  
}
app.listen(port)
