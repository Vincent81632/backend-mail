import cors from "cors";
app.use(cors());
import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

app.post("/send-mail", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "message fehlt" });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: "Notiz an mich selbst",
      text: message
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Mail konnte nicht gesendet werden" });
  }
});

app.get("/", (req, res) => {
  res.send("Mail Backend läuft");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server läuft auf Port " + PORT));