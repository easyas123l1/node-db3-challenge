const db = require('../data/db-config.js')

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
}

function find() {
  return db('schemes')
}

function findById(id) {
  return db('schemes').where({ id }).first();
}

function findSteps(id) {
  return db
  .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
  .from('schemes')
  .join('steps', 'schemes.id', 'steps.scheme_id')
  .where({ scheme_id: id })
}

function add(obj) {
  return db('schemes')
  .insert(obj, 'id')
  .then(ids => {
    const [ id ] = ids;

    return findById(id);
  })
}

function update(obj, id) {
  return db('schemes')
  .where('id', id)
  .update(obj, '*')
  .then(count => findById(id));
}

function remove(id) {
  return db('schemes')
  .where({ id })
  .delete();
}

function addStep(obj, id) {

  obj.scheme_id = id;
  return db('steps')
  .insert(obj, 'id')
  .then(ids => {
    return findSteps(id);
  })
}