"use server";
const nodemailer = require("nodemailer");
import handlebars from 'handlebars';

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

// E-posta şablonlarını doğrudan kod içine ekliyoruz.
const emailActivationTemplate = `
  <html>
    <body>
      <p>Merhaba {{firstName}},</p>
      <p>Hesabınızı doğrulamak için <a href="{{confirmLink}}">buraya</a> tıklayın.</p>
    </body>
  </html>
`;

const cargoActivationTemplate = `
  <html>
    <body>
      <p>Merhaba {{firstName}},</p>
      <p>Siparişinizle ilgili bilgiler için <a href="{{confirmLink}}">buraya</a> tıklayın.</p>
    </body>
  </html>
`;

const passwordResetTemplate = `
  <html>
    <body>
      <p>Şifrenizi sıfırlamak için <a href="{{resetLink}}">buraya</a> tıklayın.</p>
    </body>
  </html>
`;

const twoFactorTokenTemplate = `
  <html>
    <body>
      <p>İki faktörlü doğrulama kodunuz: {{token}}</p>
    </body>
  </html>
`;

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;
  const firstName = "Gizem";

  const template = handlebars.compile(emailActivationTemplate);
  const html = template({ confirmLink, firstName });

  await transporter.sendMail({
    from: "info@wiasoft.com",
    to: email,
    subject: "E-posta adresinizi onaylayın",
    html,
  });
};

export const sendVerificationEmailCargo = async (email, token) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;
  const firstName = "Gizem";

  const template = handlebars.compile(cargoActivationTemplate);
  const html = template({ confirmLink, firstName });

  await transporter.sendMail({
    from: "info@wiasoft.com",
    to: email,
    subject: "TZV Market Sipariş Bilgileri",
    html,
  });
};

export const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `${domain}/reset-password?token=${token}`;
  
  const template = handlebars.compile(passwordResetTemplate);
  const html = template({ resetLink });

  await transporter.sendMail({
    from: "info@wiasoft.com",
    to: email,
    subject: "Şifrenizi sıfırlayın",
    html,
  });
};

export const sendEmailTest = async (email) => {
  const mailResponse = await transporter.sendMail({
    from: "info@wiasoft.com",
    to: email,
    subject: "Test E-postası",
    html: "<p>TEST.</p>",
  });
  return mailResponse;
};

export const sendTwoFactorTokenEmail = async (email, token) => {
  const template = handlebars.compile(twoFactorTokenTemplate);
  const html = template({ token });

  await transporter.sendMail({
    from: "info@wiasoft.com",
    to: email,
    subject: "2FA Code",
    html
  });
};
