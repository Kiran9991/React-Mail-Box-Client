const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const dotenv = require('dotenv');
dotenv.config();

const User = require("../models/user");

const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(401).json({ message: `Email is Invalid!` });
    }

    if (user) {
      return res.status(401).json({ message: `Email Already Exists!` });
    }

    if (password.length < 6) {
      return res.status(401).json({ message: `Password is invalid!` });
    }

    if (password !== confirmPassword) {
      return res
        .status(401)
        .json({ message: `Confirm password doesn't matched` });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: "User created Successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(401).json({ message: `Email invalid!` });
    }

    if (!user) {
      return res.status(401).json({ message: `User doesn't exist!` });
    }

    const hashedPassword = user.dataValues.password;

    const token = jwt.sign({
        userId: user.id,
        email: user.email
    }, process.env.SECRET_KEY)

    const matchedPasswordResult = await bcrypt.compare(password, hashedPassword);

    if(matchedPasswordResult) {
        return res.status(201)
        .json({ 
            success: true, 
            message: `Successfully Logined up`, 
            idToken: token,
            email: user.email
        });
    }else {
        return res.status(401).json({ success: false, message: `Password is invalid!` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error` });
  }
};

module.exports = {
    signup,
    login
}
