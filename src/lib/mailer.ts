import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Initialize Nodemailer transporter
const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.error('[Mailer] SMTP credentials are not fully configured in environment variables.');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports (like 587)
    auth: {
      user,
      pass,
    },
  });
};

/**
 * Sends a notification email to the admin/portfolio owner.
 */
export async function sendContactEmail(data: EmailData): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) {
    return false;
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'mdhamim5088@gmail.com';
  const fromEmail = process.env.SMTP_FROM || `"Portfolio Contact Form" <${process.env.SMTP_USER}>`;

  // Premium Indigo-themed admin alert layout
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Message received</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
            border: 1px solid #e2e8f0;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
            padding: 32px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.025em;
          }
          .content {
            padding: 32px;
          }
          .label {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #64748b;
            margin-bottom: 6px;
          }
          .value {
            font-size: 16px;
            color: #0f172a;
            margin-bottom: 24px;
            background-color: #f1f5f9;
            padding: 12px 16px;
            border-radius: 8px;
            word-break: break-word;
          }
          .message-body {
            font-size: 15px;
            line-height: 1.6;
            color: #334155;
            background-color: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            border-left: 4px solid #4f46e5;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #f8fafc;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Inquiry Received</h1>
          </div>
          <div class="content">
            <div class="label">Sender Name</div>
            <div class="value">${data.name}</div>
            
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${data.email}" style="color: #4f46e5; text-decoration: none; font-weight: 600;">${data.email}</a></div>
            
            <div class="label">Subject</div>
            <div class="value" style="font-weight: 600;">${data.subject}</div>
            
            <div class="label">Message</div>
            <div class="message-body">${data.message}</div>
          </div>
          <div class="footer">
            This message was sent from your portfolio contact form.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to: adminEmail,
      replyTo: data.email,
      subject: `📧 Portfolio Contact: ${data.subject}`,
      text: `New Portfolio Message from ${data.name} (${data.email})\n\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
      html: htmlContent,
    });

    console.log('[Mailer] Admin notification email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('[Mailer] Error sending admin email notification:', error);
    return false;
  }
}

/**
 * Sends an automated confirmation email to the visitor.
 */
export async function sendAutoReplyEmail(data: { name: string; email: string }): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) {
    return false;
  }

  const fromEmail = process.env.SMTP_FROM || `"Hamim" <${process.env.SMTP_USER}>`;

  // Premium Indigo-themed visitor reply layout
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Thank You for Reaching Out</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
            border: 1px solid #e2e8f0;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
            padding: 36px 32px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.025em;
          }
          .content {
            padding: 32px;
            line-height: 1.6;
            font-size: 15px;
            color: #334155;
          }
          .greeting {
            font-size: 18px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 16px;
          }
          .button-wrapper {
            text-align: center;
            margin: 32px 0;
          }
          .button {
            display: inline-block;
            background-color: #4f46e5;
            color: #ffffff !important;
            font-weight: 700;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 9999px;
            box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2), 0 2px 4px -2px rgba(79, 70, 229, 0.1);
            transition: all 0.2s ease;
          }
          .footer {
            background-color: #f8fafc;
            padding: 24px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank you for reaching out!</h1>
          </div>
          <div class="content">
            <div class="greeting">Hi ${data.name},</div>
            <p>
              I have successfully received your message sent via the contact form on my portfolio website.
            </p>
            <p>
              I appreciate you taking the time to write to me. I will review your inquiry and get back to you as soon as possible, typically within 24 hours.
            </p>
            <p>
              In the meantime, feel free to explore more of my projects or view my tech stack.
            </p>
            <div class="button-wrapper">
              <a href="https://github.com/HamimBhai742" class="button" target="_blank">View My GitHub</a>
            </div>
            <p style="margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 20px; font-style: italic; color: #475569;">
              Best regards,<br>
              <strong>Hamim</strong>
            </p>
          </div>
          <div class="footer">
            This is an automated confirmation of your message submission.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to: data.email,
      subject: `Thank you for your message, ${data.name}!`,
      text: `Hi ${data.name},\n\nThank you for reaching out! I have received your message and will get back to you within 24 hours.\n\nBest regards,\nHamim`,
      html: htmlContent,
    });

    console.log('[Mailer] Auto-reply confirmation email sent to:', data.email, 'MessageId:', info.messageId);
    return true;
  } catch (error) {
    console.error('[Mailer] Error sending auto-reply email:', error);
    return false;
  }
}
