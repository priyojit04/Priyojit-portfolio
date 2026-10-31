# Enable direct website-to-email messages (EmailJS)

The contact form is wired to EmailJS, so visitors can send a message without opening Gmail or another email app. **The Service ID and Template ID from your dashboard are already filled in. The EmailJS Public Key, Service ID, and Template ID have been filled in from your dashboard screenshots. Test the form locally before publishing.**

## 1. Create an EmailJS account and connect your inbox

1. Open https://www.emailjs.com/ and sign up / sign in.
2. In the Email Services section, add and connect the email account where you want to receive portfolio messages.
3. Confirm the connected service is working in the EmailJS dashboard.

## 2. Create the email template

1. Open Email Templates and create a new template.
2. Set **To Email** to `priyojitchowdhury2001@gmail.com` (your inbox).
3. Set **Subject** to `Contact Us: New Portfolio Message from {{from_name}}`.
4. Set **Reply-To** to `{{from_email}}` so you can reply to the visitor.
5. Use this template content:

   ```text
   You have received a new message from your portfolio website.

   Name: {{from_name}}
   Visitor email: {{from_email}}

   Message:
   {{message}}
   ```

The form sends fields named `from_name`, `from_email`, and `message`; these match the variables in your current EmailJS Contact Us template. In the EmailJS dashboard, keep the Subject as `Contact Us: New Portfolio Message from {{from_name}}` (not `{{Priyojit}}`) so the visitor name appears correctly.

## 3. Copy the three IDs into script.js

Open `script.js` and find this block near the top:

```js
const EMAILJS_CONFIG = {
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID"
};
```

The three values are already set to the values visible in your dashboard. The latest EmailJS History screenshot showed Result: OK for the Contact Us template:

- `publicKey`: Account → Public Key (already configured)
- `serviceId`: `service_a09if3u`
- `templateId`: `template_38wan0a`

Do not add an EmailJS **Private Key** or your email password to the website. The Public Key is intended for browser-side use; keep your account private.

## 4. Allow the website's origin

In EmailJS dashboard → Domains / allowed origins, add the exact address used to test the site. With this project's VS Code Live Server setting, use:

`http://127.0.0.1:5501`

After deploying the portfolio, add your real website domain too. Do not use a wildcard if you can specify the exact domain.

## 5. Test it

1. Save `script.js` (`Ctrl + S`).
2. Run the site with Live Server.
3. Submit a test message using an email address you can access.
4. Look in `priyojitchowdhury2001@gmail.com` and its Spam folder.

The button displays Sending, then a success or error message. The site only shows success after EmailJS confirms the request. Email delivery may still be affected by the connected email provider or spam filtering.

## Notes

- EmailJS sends the message using the connected service and the fixed recipient in your template; the visitor's email is used as Reply-To.
- A 10-second client-side throttle is enabled. Configure origin allowlisting and CAPTCHA in EmailJS if you need stronger anti-abuse protection.
- The contact form does not store messages in a database. The received email is the message record.
- For EmailJS's latest browser SDK instructions, see https://www.emailjs.com/docs/tutorial/creating-contact-form/.
