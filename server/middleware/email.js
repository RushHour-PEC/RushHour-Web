const nodemailer = require('nodemailer')


exports.sendUserPassword = (username, password, res) => {


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: '587',
        secure: false,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD,
        },
        tls: { ciphers: 'SSLv3' },

    })

    const mailOptions = {
        from: `"Rush Hour" <${process.env.SENDER_EMAIL}>`,
        to: username,
        subject: 'New Traffic Police Station Login Details',
        html: `   <p><b>Following are your Login Details:</b></p>
                      <p>Email : ${username}</p>
                      <p>Password : ${password}</p>
                      <a href="http://localhost:3000/" target="_blank">Login</a><br/>
                      Regards,
                      Rush Hour
                    `,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        let val = false;
        if (error) {

            console.log("Error " + error);
            return val
        }
        return !val;

    })




}