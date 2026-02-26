const fs = require('fs')
const path = require('path')

const uriFile = path.join(__dirname, '.jest-mongo-uri')

if (fs.existsSync(uriFile)) {
  const uri = fs.readFileSync(uriFile, 'utf8')
  process.env.MONGO_URL = uri
}
process.env.NODE_ENV = 'test'
