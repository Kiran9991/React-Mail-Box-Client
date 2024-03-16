const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const sequelize = require('./util/database');
const User = require('./models/user');
const Mails = require('./models/Mails');
const userRoute = require('./routes/user');
const composeMailRoute = require('./routes/composeMail');

app.use(bodyParser.json());
app.use(cors());
dotenv.config();

app.use('/user', userRoute);
app.use('/composeMail', composeMailRoute);

sequelize.sync().then(() => {
    console.log('Database synced');
})

User.hasMany(Mails);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
