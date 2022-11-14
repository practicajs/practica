const { replaceInFile } = require('replace-in-file');

const regex = new RegExp('"(.*?)prisma(.*?)": "(.*)"(,?)\n', 'g');
replaceInFile({
  files: 'package.json',
  from: regex,
  to: '\n',
});