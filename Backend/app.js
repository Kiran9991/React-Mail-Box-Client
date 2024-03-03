const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const User = require('./models/user');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.post('/signup', async(req, res) => {
    try {
        
        const { email, password, confirmPassword } = req.body;

        const newUser = await User.create({ email, password, confirmPassword });

        res.status(201).json({ message: 'User created Successfully', user: newUser });
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error during signup' });
    }
})

sequelize.sync().then(() => {
    console.log('Database synced')
})

app.listen(4000, () => {
  console.log(`Server is running on port ${4000}`);
});
