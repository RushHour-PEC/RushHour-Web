const nodemailer = require('nodemailer')


exports.sendUserPassword = async (username, password) => {


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
                      <p>Please <a href="http://localhost:3000/" target="_blank">click here</a> to login</p>

                      Regards,<br/>
                      Rush Hour
                    `,
    }

    const val = false;
    const info = await transporter.sendMail(mailOptions);

    if (info) {
        return !val;
    }

    return val



}