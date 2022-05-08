import path from "path";

const filters = [
  (filePath) => path.basename(filePath) === '.DS_Store',
  (filePath) => path.basename(filePath) === 'node_modules',
];

export default function shouldIgnoreFile(filePath) {
  return filters.some(filter => filter(filePath));
}
