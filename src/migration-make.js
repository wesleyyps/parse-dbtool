const fs = require('fs');
const path = require('path');
const { migrationDirectory, buildInfo } = require('./libs/system');
const { isStartWithKeywordCreate, isRequiredDirExist, namingFile } = require('./libs/helpers');
const L = require('./libs/logger');

const builder = (args) => args
  .option('name', {
    describe: 'Migration name',
    type: 'string',
    demandOption: true,
  })
  .example([
    [
      '$0 migration:make create-pet-store',
      'When start with "create" keyword, creating new Parse.Schema template migration will be created.',
    ],
    [
      '$0 migration:make update-pet-store',
    ],
    [
      '$0 migration:make add-firstname-and-last-name-to-user-schema',
    ],
  ]);

/**
* Create migration filename
*
* @param {string} name - Action name
* @returns {string | undefined}
*/
function migrationMake(name) {
  const now = new Date();
  const filename = namingFile(now, name);

  const templateFile = (isStartWithKeywordCreate(name))
    ? fs.readFileSync(path.join(__dirname, './templates/template_create-schema.js'))
    : fs.readFileSync(path.join(__dirname, './templates/template_modify-schema.js'));

  // TODO: Check if file already exists. Because of the timestamp is inserted infront of filename
  // Same name should never exist. But, just for protection.

  const migrationFilePath = path.join(migrationDirectory, `/${filename}.js`);
  fs.writeFileSync(migrationFilePath, templateFile);

  return migrationFilePath;
}

const migrationMakeHandler = async (args) => {
  const { name } = args;

  console.log(`\n${buildInfo}\n`);

  if (!isRequiredDirExist()) {
    console.log(L.error('Required directory not found.'));
    console.log('\nSetup directories by running `npx parse-dbtool init`.\n');
    throw new Error('Required directory not found.');
    // return;
  }

  const migrationFilePath = migrationMake(name);

  if (migrationFilePath) {
    console.log(L.success(`New migration was created at ${migrationFilePath}\n`));
  } else {
    console.log(L.error(`Failed to create migration for ${name}`));
  }
};

module.exports = {
  command: 'migration:make [name]',
  // aliases: ['migration:generate [name]', 'migration:create [name]'],
  describe: 'Create migration file.',
  builder,
  handler: migrationMakeHandler,
};
