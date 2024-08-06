"use server";
const nodemailer = require("nodemailer");
import handlebars from "handlebars";
import fs from "fs";

const domain = process.env.NEXT_PUBLIC_APP_URL;
const host = process.env.MAIL_HOST;
const port = process.env.MAIL_PORT;
const auth_user = process.env.MAIL_AUTH_USER;
const auth_pass = process.env.MAIL_AUTH_PASS;

const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: auth_user,
    pass: auth_pass,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;
  const firstName = "Gizem";

  /* const source = fs.readFileSync('/public/email/email-activation.html', 'utf8');
  const template = handlebars.compile(source);
  const html = template({ confirmLink, firstName }); */
  const htmlString = `Lütfen bu bağlantıya gidin: ${confirmLink}`;

  await transporter.sendMail({
    from: "info@wiasoft.com",
    to: email,
    subject: "E-posta adresinizi onaylayın",
    //html,
    htmlString,
  });
};

//Kargoya verme için
export const sendVerificationEmailCargo = async (email, token) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;
  const firstName = "Gizem";
  /* const source = fs.readFileSync('/public/email/cargo-activation.html', 'utf8');
  const template = handlebars.compile(source);
  const html = template({ confirmLink, firstName }); */

  const htmlString = `Lütfen bu bağlantıya gidin: ${confirmLink}`;

  await transporter.sendMail({
    from: "info@wiasoft.com",
    to: email,
    subject: "TZV Market Sipariş Bilgileri",
    //html,
    htmlString,
  });
};
export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${domain}/reset-password?token=${token}`;
  await transporter.sendMail({
    from: "info@wiasoft.com",
    to: email,
    subject: `Şifrenizi sıfırlayın`,
    html: `<p>Şifreyi sıfırlamak için <a href="${resetLink}">buraya</a> tıklayın.</p>`,
  });
};

export const sendEmailTest = async (email) => {
  const mailResponse = await transporter.sendMail({
    from: "info@wiasoft.com",
    to: email,
    subject: `Şifrenizi sıfırlayın`,
    html: `<p>TEST.</p>`,
  });
  return mailResponse;
};

export const sendTwoFactorTokenEmail = async (email, token) => {
  /* const source = fs.readFileSync("/public/email/2fa-code.html", "utf8");
  const template = handlebars.compile(source);
  const html = template({ token }); */

  await transporter.sendMail({
    from: "info@wiasoft.com",
    to: email,
    subject: "2FA Code",
    //html,
    html: `<p>Your 2FA Code:${token}</p>`,
  });
}; // tekrar yolla..
