export function welcomeEmailTemplate(email: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome Email</title>

    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
      }

      .container {
        width: 100%;
        padding: 40px 0;
        background-color: #f4f4f4;
      }

      .card {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
      }

      .header {
        background-color: #111827;
        padding: 32px;
        text-align: center;
      }

      .header h1 {
        color: #ffffff;
        margin: 0;
        font-size: 28px;
      }

      .content {
        padding: 40px 32px;
        color: #374151;
        line-height: 1.7;
      }

      .content h2 {
        margin-top: 0;
        color: #111827;
        font-size: 24px;
      }

      .content p {
        margin-bottom: 16px;
        font-size: 16px;
      }

      .button-wrapper {
        text-align: center;
        margin: 32px 0;
      }

      .button {
        display: inline-block;
        padding: 14px 28px;
        background-color: #2563eb;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
      }

      .footer {
        padding: 24px;
        text-align: center;
        background-color: #f9fafb;
        color: #6b7280;
        font-size: 14px;
      }

      .email-box {
        background-color: #f3f4f6;
        padding: 12px;
        border-radius: 8px;
        font-size: 14px;
        color: #111827;
        margin-top: 12px;
      }

      @media only screen and (max-width: 600px) {
        .content {
          padding: 24px;
        }

        .header {
          padding: 24px;
        }
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="card">

        <div class="header">
          <h1>My Blog</h1>
        </div>

        <div class="content">
          <h2>Welcome aboard 🚀</h2>

          <p>
            Thank you for registering at <strong>My Blog - JCWDJKT01</strong>.
          </p>

          <p>
            Your account has been successfully created and you're now ready to explore articles, share insights, and join our community.
          </p>

          <div class="email-box">
            Registered Email: ${email}
          </div>

          <div class="button-wrapper">
            <a href="http://localhost:3000" class="button">
              Visit Website
            </a>
          </div>

          <p>
            We’re excited to have you with us!
          </p>

          <p>
            Cheers,<br />
            <strong>My Blog Team</strong>
          </p>
        </div>

        <div class="footer">
          © 2026 My Blog - JCWDJKT01. All rights reserved.
        </div>

      </div>
    </div>
  </body>
  </html>
  `;
}
