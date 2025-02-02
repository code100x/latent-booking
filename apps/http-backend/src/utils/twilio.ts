import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twillioNumber = process.env.TWILIO_NUMBER;
const client = twilio(accountSid, authToken);

export async function sendMessage(body: string, to: string) {
    console.log("----sending OTP to the user---");
    try {
        const message = await client.messages.create({
            from: twillioNumber,
            body,
            to
          });
          console.log(message.body);
    } catch(e) {
        console.log(e);
        throw new Error("error whlie sending otp")
    }
  
  }
  