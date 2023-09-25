const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, 'db.json');

const getData = async () => {
    return JSON.parse(await fs.readFile(filePath, {encoding: 'UTF-8'}));
}

module.exports = {
    getData,
}