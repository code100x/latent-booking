import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function sendMessage(body: string, to: string) {
    try {
        const message = await client.messages.create({
            from: "+12407021761",
            body,
            to
          });
          console.log(message.body);
    } catch(e) {
        console.log(e);
        throw new Error("error whlie sending otp")
    }
  
  }
  