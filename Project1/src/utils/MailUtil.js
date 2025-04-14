const mailer = require('nodemailer');

const sendingMail = async(to,subject,text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:"anjaliganvit597@gmail.com",
            pass:"hrcx gxru aqfo czcn"
        }
    })

    const mailOptions = {
        from: 'anjaliganvit597@gmail.com',
        to: to,
        subject: subject,
        text: text
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}

module.exports ={
    sendingMail
}
