const nodemailer = require('nodemailer');
const { htmlToText } = require('html-to-text');
const pug = require('pug');
const path = require('path');

module.exports = class Email {
  constructor(user, products, totalPrice ) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.products = products;
    this.totalPrice = totalPrice;
    this.from = `Golden Number Academy goldenumber@outlook.pt`
  }


  //Create Transport
  newTransport() {
    return nodemailer.createTransport({
      service: 'SendinBlue',
      auth: {
        user: process.env.SENDINBLUE_USERNAME,
        pass: process.env.SENDINBLUE_PASSWORD
      }
    })
  }

  //Send the actual Email
  async send(template, subject) {
    //HTML Template
    console.log("inside send");
    console.log(this.products);
    const html = pug.renderFile(path.join(__dirname, `../views/email/${template}.pug`), {
      firstName: this.firstName,
      products: this.products,
      subject: subject,
      totalPrice: this.totalPrice / 100
    })
    console.log("teste2");
    //Email Options
    const emailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: htmlToText(html)
    }
    console.log("teste3");
    //send the email with transport and options
    await this.newTransport().sendMail(emailOptions);
    console.log("Email was sent...")

  }

  async sendThankYou() {
    await this.send('thankyouEmail', 'Golden Number Academy - Confirmação de Compra')
  }

}