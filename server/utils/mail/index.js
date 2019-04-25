const mailer = require("nodemailer");
const { welcome } = require("./welcome_template");
require("dotenv").config();

const getEmailData = (to,name,token,template) =>{
    let data = null;

    switch(template){
        case "welcome":
            data = {
                from: "Strings <shop.strings2k19@gmail.com>",
                to,
                subject: `Welcome to Strings ${name}`,
                html: welcome()
            }
        break;
        // case "purchase":
        //     data = {
        //         from: "Waves <waves.guitars.rev@gmail.com>",
        //         to,
        //         subject: `Thanks for shopping with us ${name}`,
        //         html: purchase(actionData)
        //     }
        // break;
        // case "reset_password":
        //     data = {
        //         from: "Waves <waves.guitars.rev@gmail.com>",
        //         to,
        //         subject: `Hey ${name}, reset your pass`,
        //         html: resetPass(actionData)
        //     }
        // break;
        default:
            data;
    }
    return data;
}


const sendEmail = (to, name, token, type) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "shop.strings2k19@gmail.com",
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getEmailData(to, name, token, type);

  smtpTransport.sendMail(mail, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      cb();
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };