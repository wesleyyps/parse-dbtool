/* eslint-disable no-unused-vars */
/**
 *
 * @param {Parse} Parse
 */
exports.up = (Parse) => {
  // TODO: set className here
  const className = '';
  const schema = new Parse.Schema(className);

  // TODO: Set the schema here
  // Example:
  // schema.addString('name').addNumber('cash');

  return schema.update();
};

/**
 *
 * @param {Parse} Parse
 */
exports.down = (Parse) => {
  // TODO: set className here
  const className = '';
  const schema = new Parse.Schema(className);

  // TODO: Set the schema here
  // Example:
  // schema.deleteField('name').deleteField('cash');

  return schema.update();
};