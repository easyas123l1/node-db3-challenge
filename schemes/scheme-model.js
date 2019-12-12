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

function findSteps(id) {
  return db('schemes').select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions').join('steps', 'schemes.id', 'steps.scheme_id').where({ scheme_id: id })
}

function add(obj) {
  return db('schemes').insert(obj, 'id').then(ids => {
    const [ id ] = ids;

    return findById(id);
  })
}