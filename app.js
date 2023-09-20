const fs = require('fs/promises');
const path = require('path');
const {readdir} = require('node:fs/promises');

const filePath = path.join(__dirname, 'folder');

const createFiles= async () => {
    try {
        const directory = await fs.mkdir(filePath,(err) => {
            if (err) throw new Error(err.message);
        });
        for (let i = 0; i < 5; i++) {
            await fs.mkdir(path.join(filePath, `subfolder${i}`), (err) => {
                if (err) throw new Error(err.message);
            });
            await fs.writeFile(path.join(filePath, `subfile${i}`), `text in file${i}`, (err) => {
                if (err) throw new Error(err.message);
            });
        }

        console.log(`Children in ${filePath} were successful created :)`);

        childIsDirectoryOrFile();
    } catch (e) {
        throw new Error(e.message);
    }
}

const childIsDirectoryOrFile = async () => {
    try {
        const directoryInfo = await fs.readdir(filePath, (err) => {
            if (err) throw new Error(err.message);
        });

        for (const child of directoryInfo) {
            const isDirectory = (await fs.lstat(path.join(filePath, child), (err) => {
                if (err) throw new Error(err.message);
            })).isDirectory();
            isDirectory ?
                console.log(`FOLDER: ${child}`) :
                console.log(`FILE: ${child}`);
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

createFiles().then(() => {}).catch(e => e.message);
// childIsDirectoryOrFile().then(() => {}).catch(e => e.message);


