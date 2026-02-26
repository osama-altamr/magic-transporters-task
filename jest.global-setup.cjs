const { MongoMemoryServer } = require('mongodb-memory-server')
const fs = require('fs')
const path = require('path')

const uriFile = path.join(__dirname, '.jest-mongo-uri')

module.exports = async function globalSetup() {
  const mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  fs.writeFileSync(uriFile, uri, 'utf8')
  process.env.__MONGOD__ = mongod
}
