const fs = require('fs').promises;
const path = require('path');

async function getImagesNames() {
  const dirPath = path.join(__dirname, '../../uploads');
  let data;
  try {
    data = await fs.readdir(dirPath);
    return data;
  } catch (e) {
    console.log('Something went wrong');
  }
  data.sort();
  return data;
}

module.exports.getImagesNames = getImagesNames;
