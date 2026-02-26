const fs = require('fs')
const path = require('path')

const uriFile = path.join(__dirname, '.jest-mongo-uri')

module.exports = async function globalTeardown() {
  if (fs.existsSync(uriFile)) {
    fs.unlinkSync(uriFile)
  }
}
