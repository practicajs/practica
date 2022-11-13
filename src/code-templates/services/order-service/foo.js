const { replaceInFile } = require('replace-in-file');

const regex = new RegExp('"(.*?)sequelize(.*?)": "(.*)"(,?)\n', 'g');
replaceInFile({
  files: 'package.json',
  from: regex,
  to: '',
});

replaceInFile({
  files: 'package.json',
  from: regex,
  to: '',
});
