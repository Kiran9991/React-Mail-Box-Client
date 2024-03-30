const { where } = require("sequelize");
const Mails = require("../models/Mails");
const User = require("../models/user");

const composeMail = async (req, res) => {
  try {
    const user = req.user;

    const { userName, mailId, subject, message, viewed } = req.body;

    const existingMailId = await User.findOne({ where: { email: mailId } });

    if (!existingMailId) {
      return res.status(401).json({ message: `mail doesn't exist!` });
    }

    const mail = await Mails.create({
      sender: userName,
      receiver: mailId,
      subject,
      message,
      userId: user.userId,
      viewed: viewed
    });
    res.status(201).json({ success: true, mail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: `Something went wrong!` });
  }
};

const getSenderMails = async (req, res) => {
  try {
    const user = req.user;

    const userMails = await Mails.findAll({ where: { userId: user.userId } });

    if (!userMails) {
      return res.status(401).json({ message: `Your Draft is Empty!` });
    }

    res.status(201).json({ success: true, userMails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: `Something went wrong!` });
  }
};

const getReceiverMails = async (req, res) => {
  try {
    const user = req.user;

    const receiverMails = await Mails.findAll({
      where: { receiver: user.email },
    });

    if (!receiverMails) {
      return res.status(401).json({ message: "No Mails Found!" });
    }

    res.status(201).json({ success: true, receiverMails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: `Something went wrong!` });
  }
};

const updateViewedStatus = async (req, res) => {
    try {
        const mailId = req.params.id;
        console.log(mailId)
        const { viewed } = req.body;

        const result = await Mails.update({ viewed }, { where: { id:mailId }});

        res.status(201).json({ success: true, result, message: `Successfully viewed status updated!` });
    }catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

module.exports = {
  composeMail,
  getSenderMails,
  getReceiverMails,
  updateViewedStatus
};
