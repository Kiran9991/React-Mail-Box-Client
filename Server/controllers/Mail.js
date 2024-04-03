const Mails = require("../models/Mails");
const User = require("../models/user");

const composeMail = async (req, res) => {
  try {
    const user = req.user;

    const { userName, mailId, subject, message, viewed } = req.body;

    const existingMailId = await User.findOne({ where: { email: mailId } });

    if(!existingMailId) {
      return res.status(401).json({ message: `Mail Id doesn't exist!` });
    }

    if (existingMailId.dataValues.id === user.userId) {
      return res.status(401).json({ message: `It's your mail Id!` });
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
      return res.status(401).json({ message: "Your inbox is Empty!" });
    }

    res.status(201).json({ success: true, receiverMails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: `Something went wrong!` });
  }
};

const markAsRead = async (req, res) => {
    try {
        const mailId = req.params.id;
        const { viewed } = req.body;

        const result = await Mails.update({ viewed }, { where: { id:mailId }});

        res.status(201).json({ success: true, result, message: `Successfully viewed status updated!` });
    }catch(error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

const deleteMail = async (req, res) => {
  try {
    const mailId = req.params.id;
    const mail = await Mails.findOne({ where: { id: mailId } });

    const result = await mail.destroy();

    res.status(201).json({ success: true, result, message: `Successfully deleted!`})
  }catch(error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
  }
}

module.exports = {
  composeMail,
  getSenderMails,
  getReceiverMails,
  markAsRead,
  deleteMail
};
