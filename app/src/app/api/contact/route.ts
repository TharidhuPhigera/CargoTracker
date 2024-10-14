import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ message: "Tutti i campi sono obbligatori" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: true, // Use SSL
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.RECIPIENT_EMAIL, // Use recipient email from the environment variables
      subject: `New contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    // Try to send the email
    await transporter.sendMail(mailOptions);
    console.log(process.env.SMTP_USER, process.env.SMTP_PASS, process.env.SMTP_HOST, process.env.SMTP_PORT);

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending mail:", error); // Log the error for debugging
    return NextResponse.json({ message: "Error sending message" }, { status: 500 });
  }
}