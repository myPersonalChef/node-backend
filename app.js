const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const details = require('./details.json');

const app= express();

app.use(cors({origin: "*"}));
app.use(bodyParser.json());

app.listen(3000 , ()=>{
    console.log("The backend server started ....");
})

app.post("/sendEmail", (req, res)=>{
    console.log("request came in...");
    const user = req.body;
    sendEmail(user, info =>{
        console.log("The mail has been send and id is", info.messageId);
        res.send(info);
    });
});

async function sendEmail(user, callback){
    // console.log(details.email , details.password);
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port:  587,
        secure: false,
        auth:{
            user: details.email,
            pass: details.password
        }
    });

    let mailOptions = {
        from:'"My Personal Chef"',
        to: user.email,
        subject: "Your order is delivered",
        html: `<h3>Hi ${user.name}</h3><br />

        Your order was delivered <br/>

        Order Details : <br/>

        <table>
            <tr>
                <td>order id:</td>
                <td>${user.orderId}</td>
            </tr>
            <tr>
                <td>Recipe Name:</td>
                <td>${user.recipeName}</td>
            </tr>
            <tr>
                <td>Delivery Time:</td>
                <td>${user.time}</td>
            </tr>
        </table>
        <br/>
        <h4>Enjoy your order</h4>
        `
    };

    let info = await transporter.sendMail(mailOptions);

    callback(info);
}