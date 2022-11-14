const { replaceInFile } = require('replace-in-file');

async function loo() {
  const phrasesToRemove = [
    '"db:migrate":().*,\n',
    '"(.*?)sequelize(.*?)": "(.*)"(,?)\n',
  ];
  for (const phraseToReplace of phrasesToRemove) {
    const fromExpression = new RegExp(phraseToReplace, 'g');
    await replaceInFile({
      files: 'package.json',
      from: fromExpression,
      to: '',
    });
  }

  await replaceInFile({
    files: 'package.json',
    from: 'db:migrate:prisma',
    to: 'db:migrate',
  });
}

loo();
