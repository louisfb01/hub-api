import nodemailer from 'nodemailer';

var emailHost = process.env.CODA_HUB_API_EMAIL_HOST as string;
var emailPort = process.env.CODA_HUB_API_EMAIL_PORT as unknown as number;
var emailRecipients = process.env.CODA_HUB_API_ERROR_EMAIL_RECIPIENTS;


async function sendEmailToErrorList(content: any, userEmail?: string) {
    const contentString = JSON.stringify(content, null, "\t").replace(/\\n    /g, "\n");

    if (userEmail) {
        emailRecipients = userEmail; //only send email to user who made error. if demouser, send to everyone
    }

    if (!emailRecipients || !emailHost || !emailPort) {
        console.log("Error email sending is disabled.");
        console.log(contentString)
        return;
    }

    let transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: false, // true for 465, false for other ports
        tls: { rejectUnauthorized: false }
    });

    try {
        let info = await transporter.sendMail({
            from: '"Do not reply" <donotreply@coda.ca>', // sender address
            to: emailRecipients, // list of receivers
            subject: "Coda Hub Api error", // Subject line
            text: contentString, // plain text body
        });

        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        console.warn('=== trouble sending email ===');
        console.error(err);
    }
}

export default {
    sendEmailToErrorList
}