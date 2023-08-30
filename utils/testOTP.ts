import TwilioSDK from "twilio";

const accountSid = "AC19e435677381c0cc84df75fdc1621c90";
const authToken = "75081d406508db01ef8e0cb035293406"
const verifySid = "VAf8cd7e3f4aae647147b00880e9d89927";


const client = TwilioSDK(accountSid, authToken)
client.verify.v2
  .services(verifySid)
  .verifications.create({ to: "+2349134102236", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Please enter the OTP:", (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: "+2349134102236", code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close());
    });
  });