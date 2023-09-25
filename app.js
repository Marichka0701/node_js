const express = require('express');

const {getData} = require('./getData');
const {writeData} = require("./writeData");

const app = express();

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/users', async (req, res) => {
    const users = await getData();
    res.status(200).json(users);
});

app.get('/users/:id', async (req, res) => {
    const {id} = req.params;

    const users = await getData();

    if (id >= 0 && id <= users.length) {
        const particularUser = users.find(user => user.id === +id);

        res.status(200).json({particularUser});
    } else {
        res.status(404).json('Invalid id, user hasn`t been found');
    }
});

app.post('/users', async (req, res) => {
    const users = await getData();

    const user = req.body;

    const {name, age, sex} = user;

    if (age <= 0) {
        res.status(400).json('Invalid data! Age must be greater than 0');
        return;
    }

    if (name.length <=3 ) {
        res.status(400).json('Invalid data! Name must have greater than 3 symbols');
        return;
    }

    if (name && age && sex) {
        users.push(user);

        await writeData(users);
        res.status(200).json({result: users});
    }
})

app.delete('/users/:id', async (req, res) => {
    const {id} = req.params;

    const users = await getData();

    if (id >= 0 && id <= users.length) {
        const filteredUsers = users.filter(user => user.id !== +id);

        await writeData(filteredUsers);
        res.status(200).json({result: filteredUsers});
    } else {
        res.status(404).json('Invalid id, user hasn`t been found');
    }
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;

    let users = await getData();

    if (id >= 0 && id < users.length) {
        // because id starts from 1
        users[id - 1] = req.body;

        await writeData(users);
        res.status(200).json({ result: users });
    } else {
        res.status(404).json('Invalid id, user hasn`t been found');
    }
});
