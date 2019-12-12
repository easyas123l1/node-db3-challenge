const db = require('../data/dbconfig.js')

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
}

function find() {
  return db('schemes')
}

function findById(id) {
  return db('schemes').where({ id }).first();
}

