const fs = require('fs')
const util = require('util')

function objectToJson (firstPath, endPath) {
  const object = require(firstPath)
  fs.writeFileSync(endPath, JSON.stringify(object, null, 2));
}

function jsonToObject (firstPath, endPath) {
  const json = require(firstPath)
  fs.writeFileSync(endPath, `module.exports = ${util.inspect(json, {showHidden: false, depth: null})}`);
}

function run(args) {

  if(typeof args[1] !== 'string' || !fs.existsSync(args[1])) {
    console.error('First path dont exists')
  }

  if(typeof args[2] !== 'string' || !fs.existsSync(args[1])) {
    console.error('End path dont exists')
  }

  switch(args[0]) {
    case 'obj-json':
      objectToJson(args[1], args[2])
      break;
    case 'json-obj':
      jsonToObject(args[1], args[2])
      break;
    default:
      console.error('Wrong action')
  }
}

run(process.argv ? process.argv.slice(2) : '')
