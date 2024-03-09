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
const { json } = require('sequelize');
const saltRounds = 10;

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

        if(password.length < 6) {
          return res.status(401).json({ message: `Password is invalid!`})
        }

        if(password !== confirmPassword) {
          return res.status(401).json({ message: `Confirm password doesn't matched`});
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({ email, password: hashedPassword });

        res.status(201).json({ message: 'User created Successfully', user: newUser });
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
})

app.post('/login', async(req, res) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if(!email.includes('@') || !email.includes('.')) {
      return res.status(401).json({ message: `Email invalid!`});
    }

    if(!user) {
      return res.status(401).json({ message: `User doesn't exist!`});
    }

    bcrypt.compare(password, user.dataValues.password, function(err, result) {
      if(result) {
        return res.status(201).json({ message: `Successfully Logined up`, result, user });
      }else {
        return res.status(401).json({ message: `Password is invalid!` });
      }
  });

  }catch(error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error` });
  }
})

sequelize.sync().then(() => {
    console.log('Database synced')
})

app.listen(4000, () => {
  console.log(`Server is running on port ${4000}`);
});
