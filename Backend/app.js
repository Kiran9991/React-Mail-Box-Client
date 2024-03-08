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

// Auth signup api
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlainText = "Kiran";

app.post('/signup', async(req, res) => {
    try {
        
        const { email, password, confirmPassword } = req.body;
        const user = await User.findOne({ where: { email: email } });

        if(!email.includes('@') || !email.includes('.')) {
          return res.status(401).json({ message: `Email is Invalid!`});
        }

        if(user) {
          return res.status(401).json({ message: `Email Already Exists!`});
        }

        if(password !== confirmPassword) {
          return res.status(401).json({ message: `Confirm password doesn't matched`});
        }

        bcrypt.hash(myPlainText, saltRounds, async (err, password) => {
          const newUser = await User.create({ email, password });
          
          res.status(201).json({ message: 'User created Successfully', user: newUser });
        })

    }catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

sequelize.sync().then(() => {
    console.log('Database synced')
})

app.listen(4000, () => {
  console.log(`Server is running on port ${4000}`);
});
