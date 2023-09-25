const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, 'db.json');

const writeData = async (data) => {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, { encoding: 'utf-8' });
}

module.exports = {
    writeData,
}